var Web3 = require("web3")
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546"));
}

var proposalAddress = "0x000000000000000000000000000000000000F002"; //提议合约地址

const proposal = JSON.parse(fs.readFileSync("./build/contracts/Proposal.json"));
var proposalInstance = new web3.eth.Contract(proposal.abi, proposalAddress);

//监听创建提议事件，将events.LogCreateProposal.returnValues.id提交给超过半数的验证人审批
proposalAddress.events.LogCreateProposal({
    filter: {},
    fromBlock: 0
}, function (error, event) { })
    .on('data', function (event) {
        console.log("event:",event); 
    })
    .on('changed', function (event) {
        // remove event from local database
    })
    .on('error', console.error);