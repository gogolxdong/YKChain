/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require("web3");

 // const infuraKey = "fj4jll3k.....";
 //
 const fs = require('fs');
//  const mnemonic = fs.readFileSync(".secret").toString().trim();
 
 module.exports = {
   networks: {
     development: {
       provider: () => new Web3.providers.WebsocketProvider('ws://127.0.0.1:1114'),
      //  provider: () => new HDWalletProvider(mnemonic, 'https://http-mainnet.hecochain.com'),
       network_id: 128
     }
   },
 
   // Set default mocha options here, use special reporters etc.
   mocha: {
     // timeout: 100000
   },
 
   // Configure your compilers
   compilers: {
     solc: {
       version: "0.7.0",    // Fetch exact version from solc-bin (default: truffle's version)
       docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
       }
     }
   },
 
   // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
   //
   // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
   // those previously migrated contracts available in the .db directory, you will need to run the following:
   // $ truffle migrate --reset --compile-all
 
   db: {
     enabled: false
   }
 };
 