
const Bridge = artifacts.require("Bridge");
const BridgeStorage = artifacts.require("BridgeStorage");
const BridgeLogic = artifacts.require("BridgeLogic");
const YBTC = artifacts.require("YBTC");

module.exports = function(deployer) {
  deployer.deploy(Bridge,["0xcd0C087aA41Fb181bf78d904A0BE1AF6da42Dbff"], 1);
  deployer.deploy(BridgeStorage, "0xcd0C087aA41Fb181bf78d904A0BE1AF6da42Dbff");
  deployer.deploy(BridgeLogic, "0xcd0C087aA41Fb181bf78d904A0BE1AF6da42Dbff");
  // deployer.deploy(YBTC);
};