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

const address = "0x2cba6f401df45b113b073f8609985ac47186854d"
//创建验证人提议
// proposalInstance.methods.createProposal(address, "")
//     .send({ from: address }).
//     then(result => {
//         console.log(result)
//         var id = result.events.LogCreateProposal.returnValues.id
//         console.log("id:", id)
//         // 记录此提议id, 将id发给超过半数的验证人审批

//     })

//通过半数以上投票后，创建为验证人
// validatorsInstance.methods.createOrEditValidator(address,"","","","","").send({from:address}).then(instance => {
//     console.log(instance)
//     validatorsInstance.methods.getActiveValidators().call().then(console.log);
// })

// validatorsInstance.methods.getActiveValidators().call().then(console.log);
validatorsInstance.methods.distributeBlockReward().send({from:address, value}).then(console.log);
//向验证人至少质押32个以太坊单位货币才能成为活跃验证人，活跃验证人在一个区块epoch后更新
// validatorsInstance.methods.stake(address).send({ from: address, value: helpers.ether("32") }).then(console.log);





