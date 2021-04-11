const Web3 = require("web3");
var fs = require('fs');
var helpers = require('@openzeppelin/test-helpers');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = fs.readFileSync(".secret").toString().trim();

const web3 = new Web3();
web3.setProvider(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546"));
// web3.setProvider(new HDWalletProvider(mnemonic, 'https://http-mainnet.hecochain.com'))
// web3.setProvider(new Web3.providers.WebsocketProvider('wss://ws-mainnet-node.huobichain.com'))

// var bridgeAddress = "0xA929022c9107643515F5c777cE9a910F0D1e490C"; //Heco跨链桥合约地址

var bridgeAddress = "0x99bF0aEDa699DFAC56dA4E16d2880466991f66Af"; //跨链桥合约地址

const bridge = JSON.parse(fs.readFileSync("./build/contracts/Bridge.json"));
var bridgeInstance = new web3.eth.Contract(bridge.abi, bridgeAddress);

var ybtcAddress = "0x9B5dF00946db7d3eDeCD8d83395136DDCfE17D20"
const ybtc = JSON.parse(fs.readFileSync("./build/contracts/YBTC.json"));
var ybtcInstance = new web3.eth.Contract(ybtc.abi, ybtcAddress);

//监听创建提议事件，将events.LogCreateProposal.returnValues.id提交给超过半数的验证人审批
// bridgeInstance.events.DepositNative({
//     filter: {},
//     fromBlock: 0
// }, function (error, event) { })
//     .on('data', function (event) {
//         console.log("event:", event);
//     })
//     .on('changed', function (event) {
//         // remove event from local database
//     })
//     .on('error', console.error);

// bridgeInstance.events.DepositToken({
//     filter: {},
//     fromBlock: 0
// }, function (error, event) { })
//     .on('data', function (event) {
//         console.log("event:", event);
//     })
//     .on('changed', function (event) {
//         // remove event from local database
//     })
//     .on('error', console.error);

// bridgeInstance.events.WithdrawingNative({
//     filter: {},
//     fromBlock: 0
// }, function (error, event) { })
//     .on('data', function (event) {
//         console.log("event:", event);
//     })
//     .on('changed', function (event) {
//         // remove event from local database
//     })
//     .on('error', console.error);

// bridgeInstance.events.WithdrawingToken({
//     filter: {},
//     fromBlock: 0
// }, function (error, event) { })
//     .on('data', function (event) {
//         console.log("event:", event);
//     })
//     .on('changed', function (event) {
//         // remove event from local database
//     })
//     .on('error', console.error);

// bridgeInstance.events.WithdrawDoneNative({
//     filter: {},
//     fromBlock: 0
// }, function (error, event) { })
//     .on('data', function (event) {
//         console.log("event:", event);
//     })
//     .on('changed', function (event) {
//         // remove event from local database
//     })
//     .on('error', console.error);

// bridgeInstance.events.WithdrawDoneToken({
//     filter: {},
//     fromBlock: 0
// }, function (error, event) { })
//     .on('data', function (event) {
//         console.log("event:", event);
//     })
//     .on('changed', function (event) {
//         // remove event from local database
//     })
//     .on('error', console.error);


//存原生币
// bridgeInstance.methods.depositNative("0x2cba6f401df45b113b073f8609985ac47186854d", "YKChain").send({ from: "0x2cba6f401df45b113b073f8609985ac47186854d" }).then(instance => {
//     console.log(instance)
// });

//存Token
// bridgeInstance.methods.depositToken("Token地址", 100, "目标地址", "YKChain").send({ from: "0x2cba6f401df45b113b073f8609985ac47186854d" }).then(instance => {
//     console.log(instance)
// });

//取原生币
// bridgeInstance.methods.withdrawNative("0x2cba6f401df45b113b073f8609985ac47186854d",
//     1, "0x219295438b17c92dbc62ee9b1874dc1a25cf55368e13d34d65325217d4acbafe",
//     "0x1529946a2c395a34af096baf4f1f364edce9cd89aa981e5ca1246266f2430ec9").send({ from: "0x2cba6f401df45b113b073f8609985ac47186854d" }).then(instance => {
//         console.log(instance)
//     });

//取Token
// #	Name	Type	Data
// 0	_token	address	0xdF574c24545E5FfEcb9a659c229253D4111d87e1 HUSD
// 1	to	address	0xa9C0204b10BBa10FFce488DcE6FFFf1CACDBbB10
// 2	value	uint256	120114100000000
// 3	proof	string	heco_0298c2b32eae4da002a15f36fdf7615bea3da047_864f5e07c423d158ae68b0bebc2ebadfbe815e71bf48ec68ad5e2511730ec102_2
// 4	taskHash	bytes32	0x8e6cdc8f7205f1a88b3809d5ce3fe76aff711c72bc58558a133ac4486ed48198
// bridgeInstance.methods.withdrawToken("Token地址","取钱地址", 金额，证明，taskHash).send({ from: "0x2cba6f401df45b113b073f8609985ac47186854d" }).then(instance => {
//     console.log(instance)
// });