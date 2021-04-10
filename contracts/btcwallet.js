var utils = require('./utils');

// 生成密钥对写入文件
utils.generateKeyPair("wallet2.dat")

// 从文件还原密钥对
var wallet = utils.getKeyPairFromWIF("wallet2.dat")
console.log(wallet)

// 查询余额和交易记录
var fromAddress = "msfAPhJqdtfx9WA7rqW313CYxP5b73NYCF"
var toAddress = "mrvdXaX94isjs9JtoBpjPZ37gg2wAKM82o"

// utils.getBalance(fromAddress);
// utils.getBalance(toAddress);

utils.getTxRecords(fromAddress);

// 创建新交易
// utils.newTx(restoredPair, fromAddress, toAddress, 1);
