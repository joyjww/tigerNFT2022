const Cryptopunks = artifacts.require("Cryptopunks");

module.exports = function (deployer) {
  deployer.deploy(Cryptopunks);
};
