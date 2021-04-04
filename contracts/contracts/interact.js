const fs = require('fs');
const Web3 = require("web3");
const solc = require('solc');
const { compile } = require('nunjucks/src/compiler');

const CONTRACT_FILE = './Proposal.sol'
const content = fs.readFileSync(CONTRACT_FILE);
console.log(content.toString())

const web3 = new Web3();

// Ganache默认端口7545
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8546"));

var input = {
    language: 'Solidity',
    sources: {
      [CONTRACT_FILE]: {
        content: content
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }
const compiled = solc.compile(JSON.stringify(input));
var output = JSON.parse(compiled);
console.log(output)

const bytecode = output.contracts[':Proposal'].bytecode;
const abi = output.contracts[':Proposal'].interface;

new web3.eth.Contract(JSON.parse(abi), {
    // 必填，合约发起者
    from: '0x2334a96f67b6c8906954a7b56333271e142db36d',
    // 合约bytecode，也可也在deploy中传入
    data: bytecode,
    // 即gas limit，该交易最大可使用的Gas
    gas: 4712388,
    gasPrice: '1000000'
}).deploy().send().then((instance) => {
    // console.log(instance)

    // 合约地址
    // console.log(`Address: ${instance.options.address}`);

    //执行合约，只是查询状态，不需要挖矿，所以调用call方法
    console.log(instance.methods.createProposal('0x2334a96f67b6c8906954a7b56333271e142db36d',"选举"))
})