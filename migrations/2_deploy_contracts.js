// migrating the appropriate contracts
var PhotographerRole = artifacts.require("./PhotographerRole.sol")
var CustomerRole = artifacts.require("./CustomerRole.sol");
var EditorRole = artifacts.require("./EditorRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(PhotographerRole);
  deployer.deploy(CustomerRole);
  deployer.deploy(EditorRole);
  deployer.deploy(SupplyChain);
};
