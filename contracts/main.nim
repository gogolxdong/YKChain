import web3
import httpclient
import json
import strutils
import sequtils
import tables
import os
import strformat
import contract
import chronos, nimcrypto, options, json, stint

var client = newHttpClient()
var address = "msfAPhJqdtfx9WA7rqW313CYxP5b73NYCF"
var response = client.get("https://api.blockcypher.com/v1/btc/test3/addrs/" & address)
var body = parseJson response.body

# var txHashes: OrderedTable[string, tuple[height: int, found: bool]]

# for tx in body["txrefs"]:
#     txHashes[tx["tx_hash"].getStr] = (tx["block_height"].getInt, false)

# echo txHashes

# for hash, info in txHashes.mpairs:
#     var height = $info.height
#     if info.found == false:
#         var limit = 5000
#         var url = &"https://api.blockcypher.com/v1/btc/test3/blocks/{height}?txstart=1&limit={limit}"
#         response = client.get(url)
#         var blockDetails = parseJson response.body
#         if hash notin blockDetails["txids"].mapIt(it.getStr):
#             echo "missed " & hash & " at height " & height


proc deployContract*(web3: Web3, code: string, gasPrice = 0): Future[ReceiptObject] {.async.} =
  let provider = web3.provider
  let accounts = await provider.eth_accounts()

  var code = code
  if code[1] notin {'x', 'X'}:
    code = "0x" & code
  var tr: EthSend
  tr.source = web3.defaultAccount
  tr.data = code
  tr.gas = Quantity(3000000).some
  if gasPrice != 0:
    tr.gasPrice = some(gasPrice)

  let r = await web3.send(tr)
  return await web3.getMinedTransactionReceipt(r)

contract(YBTCContract):
  proc mint( targetAddress: Address, value: UInt256):bool
  proc burn( value: UInt256)

  proc Transfer(fromAddr, toAddr: indexed[Address], value: Uint256) {.event.}
  proc Mint(to: Address, value: Uint256) {.event.}
  proc Burn(burner: Address,value: Uint256) {.event.}


proc subMint(ybtc: Sender) {.async.} =
    let notifFut = newFuture[void]()
    var notificationsReceived = 0

    let s = await ybtc.subscribe(Mint) do (
        toAddr: Address, value: Uint256)
        {.raises: [Defect], gcsafe.}:
      try:
        echo "onMint: ", " Mint ", value, " to ", toAddr
        inc notificationsReceived
        if notificationsReceived == 2:
          notifFut.complete()
      except Exception as err:
        doAssert false, err.msg

    await notifFut
    await s.unsubscribe()

proc subBurn(ybtc: Sender) {.async.} =
    let notifFut = newFuture[void]()
    var notificationsReceived = 0

    let s = await ybtc.subscribe(Burn) do (
        burner: Address, value: Uint256)
        {.raises: [Defect], gcsafe.}:
      try:
        echo "onBurn: ", " Mint ", value, " to ", burner
        inc notificationsReceived
        if notificationsReceived == 2:
          notifFut.complete()
      except Exception as err:
        doAssert false, err.msg

    await notifFut
    await s.unsubscribe()

proc subTransfer(ybtc: Sender) {.async.} =
    let notifFut = newFuture[void]()
    var notificationsReceived = 0

    let s = await ybtc.subscribe(Transfer) do (
        fromAddr, toAddr: Address, value: Uint256)
        {.raises: [Defect], gcsafe.}:
      try:
        echo "onTransfer: ", " Transfer from ", fromAddr, " to ", toAddr
        inc notificationsReceived
        if notificationsReceived == 2:
          notifFut.complete()
      except Exception as err:
        doAssert false, err.msg

    await notifFut
    await s.unsubscribe()

proc test() {.async.} =
    var ybtcAddress = Address.fromHex("0xa5CD9B271D67E564A9Ac1fcC652D14538201178c")

    let web3 = await newWeb3("ws://119.8.110.221:8546/")
    let accounts = await web3.provider.eth_accounts()
    echo accounts
    web3.defaultAccount = accounts[0]

    # let receipt = await web3.deployContract(contractCode)
    # ybtcAddress = receipt.contractAddress.get
    # echo "Deployed Deposit contract: ", ybtcAddress

    var ybtc = web3.contractSender(YBTCContract, ybtcAddress)

    var burnEvents = await ybtc.getJsonLogs(Burn,fromBlock = some(blockId(0)))
    # for e in burnEvents:
    #     echo e

    # await subBurn(ybtc)
    await subMint(ybtc)
    # await subTransfer(ybtc)

    var addressString = "0xcd0C087aA41Fb181bf78d904A0BE1AF6da42Dbff"
    var address = Address.fromHex addressString



    # echo await ybtc.mint(address, 1.u256).send()
    # echo await ybtc.burn(1.u256).send()
    # var mintEvents = await ybtc.getJsonLogs(Mint,fromBlock = some(blockId(0)))
    # for e in mintEvents:
    #     echo e


waitFor test()