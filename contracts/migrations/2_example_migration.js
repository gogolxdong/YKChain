
// const Bridge = artifacts.require("Bridge");
const YBTC = artifacts.require("YBTC");

module.exports = function(deployer) {
  // deployer.deploy(Bridge,["0x2cba6f401df45b113b073f8609985ac47186854d"],1);
  deployer.deploy(YBTC);
};