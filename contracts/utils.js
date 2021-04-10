const axios = require('axios');
const Bitcoin = require('bitcoinjs-lib');
const NetworkType = Bitcoin.networks.testnet;
const FS = require('fs');
const request = require('request');

// 生成密钥对，将哈希密钥写入指定文件
function generateKeyPair(file) {
    let keyPair = Bitcoin.ECPair.makeRandom({ network: NetworkType })
    let privateKey = keyPair.toWIF()
    const { address } = Bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: NetworkType,
    });

    FS.writeFileSync(file,  privateKey, function (error) {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log("success");
        return true;
      }
    });
}

// 从文件读取恢复密钥对
function getKeyPairFromWIF(file) {
    let data = FS.readFileSync(file, "utf8" , function (error, data) {
        return data;
    });
    
    var restoredPair = Bitcoin.ECPair.fromWIF(data, NetworkType);
    const { address } = Bitcoin.payments.p2pkh({
      pubkey: restoredPair.publicKey,
      network: NetworkType,
    });
    return {keyPair:restoredPair, address: address}
}

// 查询余额
function getBalance(address) {
    var getbalance_url = 'https://api.blockcypher.com/v1/btc/test3/addrs';
    var url = getbalance_url + "/" + address + "/balance";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    })
}

//查询交易记录
function getTxRecords(address) {
    var getTxRecords_url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';
    url = getTxRecords_url + address;
    console.log("TxRecordsUrl", url);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    })
}


//创建交易
function newTx(keypair, fromAddress, toAddress, value) {
    var keys = Bitcoin.ECPair.fromPrivateKey(keypair.privateKey);
    var newTx = {
        inputs: [{ addresses: [fromAddress] }],
        outputs: [{ addresses: [toAddress], value: value }]
    }

    axios.post('https://api.blockcypher.com/v1/btc/test3/txs/new', JSON.stringify(newTx))
        .then(function (tmptx) {
            tmptx.data.pubkeys = [];
            tmptx.data.signatures = tmptx.data.tosign.map(function (tosign, n) {
                tmptx.data.pubkeys.push(keys.publicKey.toString('hex'));
                return Bitcoin.script.signature.encode(
                    keys.sign(Buffer.from(tosign, "hex")),
                    0x01,
                ).toString("hex").slice(0, -2);
            });

            // 解开JSON序列化过程中对象的循环引用
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
            const getCircularReplacer = () => {
                const seen = new WeakSet();
                return (key, value) => {
                    if (typeof value === "object" && value !== null) {
                        if (seen.has(value)) {
                            return;
                        }
                        seen.add(value);
                    }
                    return value;
                };
            };
            axios.post('https://api.blockcypher.com/v1/btc/test3/txs/send', JSON.stringify(tmptx.data, getCircularReplacer()))
                .then(function (finaltx) {
                    console.log(finaltx);
                })
                .catch(function (xhr) {
                    console.log(xhr.response.data);
                });
        }).catch(function (error) { console.log(error) });
}

module.exports = {
    generateKeyPair,
    getKeyPairFromWIF,
    getBalance,
    getTxRecords,
    newTx,
}