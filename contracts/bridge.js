const Web3 = require("web3");
var fs = require('fs');
var helpers = require('@openzeppelin/test-helpers');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const { ENGINE_METHOD_CIPHERS } = require("constants");
const ether = require("@openzeppelin/test-helpers/src/ether");
const keccak256 = require('keccak256')

const web3 = new Web3();
web3.setProvider(new Web3.providers.WebsocketProvider("ws://127.0.0.1:1114"));
// web3.setProvider(new HDWalletProvider(mnemonic, 'https://http-mainnet.hecochain.com'))
// web3.setProvider(new Web3.providers.WebsocketProvider('wss://ws-mainnet-node.huobichain.com'))

var sender = "0xcd0C087aA41Fb181bf78d904A0BE1AF6da42Dbff"

const bridge = JSON.parse(fs.readFileSync("./build/contracts/Bridge.json"));
var bridgeAddress = "0x02814a86fBadB6C996E38665cAAFe1B971DF8B18"; //跨链桥合约地址
var bridgeInstance = new web3.eth.Contract(bridge.abi, bridgeAddress);

const bridgeStorage = JSON.parse(fs.readFileSync("./build/contracts/BridgeStorage.json"));
var bridgeStorageAddress = "0xEe07ccAC9f27E28398514Db6E474abfbdfcdeD8c";
var bridgeStorageInstance = new web3.eth.Contract(bridgeStorage.abi, bridgeStorageAddress);

const bridgeLogic = JSON.parse(fs.readFileSync("./build/contracts/BridgeLogic.json"));
var bridgeLogicAddress = "0x34a39dE5a38c5e847AfaaBAabfdFfc1bbb7133B2";
var bridgeLogicInstance = new web3.eth.Contract(bridgeLogic.abi, bridgeLogicAddress);


var ybtcAddress = "0xaE519389BDA198784DB2c4eF35C907d9C1153f59"
const ybtc = JSON.parse(fs.readFileSync("/root/yk-contracts/build/contracts/YBTC.json"));
var ybtcInstance = new web3.eth.Contract(ybtc.abi, ybtcAddress);

// var id = bridgeInstance.extend.utils.keccak256("operator")
// console.log(id);

// bridgeInstance.methods.getAdminAddresses("owner").call().then(instance => {
//     console.log(instance)
// });

// //添加supporter,使supporter可以调用operator的方法
bridgeStorageInstance.methods.addSupporter("0x46a52cf33029de9f84853745a87af28464c80bf0346df1b32e205fc73319f622" , sender).send({ from: sender }).then(instance => {
    console.log(instance)
});

// // 设置入金选择器，需要operator权限
// bridgeInstance.methods.setDepositSelector(ybtcAddress, "transferFrom(address,address,uint256)", false).send({ from: sender }).then(instance => {
//     console.log(instance)
// });

// bridgeInstance.methods.setWithdrawSelector(ybtcAddress, "transfer(sender,uint256)" ,false).send({ from: sender }).then(instance => {
//     console.log(instance)
// });


//监听创建提议事件
// ybtcInstance.events.Burn({
//     filter: {},
//     fromBlock: 0
// }, function (error, event) { })
//     .on('data', function (event) {
//         console.log("event:", event);
//     })
//     .on('changed', function (event) {
//         // remove event from local database
//     })
//     .on('error', console.error);2

// ybtcInstance.methods.mint(address, 1).send({ from: address }).then(instance => {
//     console.log(instance)
// });


// ybtcInstance.methods.burn(1).send({ from: address }).then(instance => {
//     console.log(instance)
// });

//存入原生币
// bridgeInstance.methods.depositNative(address, "YKChain").send({ from: sender }).then(instance => {
//     console.log(instance)
// });


//存入代币
// bridgeInstance.methods.depositToken(ybtcAddress, 100, "0x3820860CaA6e7E7e7dbA0bC370EE6693ad441fde", "btc").send({ from: sender }).then(instance => {
//     console.log(instance)
// });

//提取原生币
// bridgeInstance.methods.withdrawNative(sender,
//     1, "0x219295438b17c92dbc62ee9b1874dc1a25cf55368e13d34d65325217d4acbafe",
//     "0x1529946a2c395a34af096baf4f1f364edce9cd89aa981e5ca1246266f2430ec9").send({ from: sender }).then(instance => {
//         console.log(instance)
//     });

//提取Token
// #	Name	Type	Data
// 0	_token	address	0xdF574c24545E5FfEcb9a659c229253D4111d87e1 HUSD
// 1	to	address	0xa9C0204b10BBa10FFce488DcE6FFFf1CACDBbB10
// 2	value	uint256	120114100000000
// 3	proof	string	heco_0298c2b32eae4da002a15f36fdf7615bea3da047_864f5e07c423d158ae68b0bebc2ebadfbe815e71bf48ec68ad5e2511730ec102_2
// 4	taskHash	bytes32	0x8e6cdc8f7205f1a88b3809d5ce3fe76aff711c72bc58558a133ac4486ed48198
// bridgeInstance.methods.withdrawToken("Token地址","取钱地址", 金额，证明，taskHash).send({ from: address }).then(instance => {
//     console.log(instance)
// });