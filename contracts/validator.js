const Web3 = require("web3");
var fs = require('fs');
var helpers = require('@openzeppelin/test-helpers');

const web3 = new Web3();
web3.setProvider(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546"));

var validatorAddress = "0x000000000000000000000000000000000000F000"; //验证人合约地址
var punishAddress = "0x000000000000000000000000000000000000F001";
var proposalAddress = "0x000000000000000000000000000000000000F002"; //提议合约地址


const proposal = JSON.parse(fs.readFileSync("./build/contracts/Proposal.json"));
var proposalInstance = new web3.eth.Contract(proposal.abi, proposalAddress);

const validators = JSON.parse(fs.readFileSync("./build/contracts/Validators.json"));
var validatorsInstance = new web3.eth.Contract(validators.abi, validatorAddress);

const punish = JSON.parse(fs.readFileSync("./build/contracts/Punish.json"));
var punishInstance = new web3.eth.Contract(punish.abi, punishAddress);

//对提议投票，赞成true, 反对false
proposalInstance.methods.voteProposal("提议id", true).send({ from: '审批人地址' }).then(instance => {
    console.log(instance)
})

//向验证人质押32个以太坊货币单位
validatorsInstance.methods.stake("质押地址").send({ from: '质押人地址', value: helpers.ether("32") }).then(instance => {
    console.log(instance)
    //查看质押信息
    validatorsInstance.methods.getValidatorInfo("质押地址").call().then(console.log);
});

//取消质押
validatorsInstance.methods.unstake("质押地址").send({ from: '质押人地址'}).then(console.log);
