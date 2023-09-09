const DataVerification = artifacts.require('DataVerification');
const NodeVoting = artifacts.require('NodeVoting');
const Authentication = artifacts.require('Authentication');
const NumericIntegration = artifacts.require('NumericIntegration');
const StringIntegration = artifacts.require('StringIntegration');
const NumericProcess = artifacts.require('NumericProcess');
const StringProcess = artifacts.require('StringProcess');
const ProvideEvent = artifacts.require('ProvideEvent');
const Oracle = artifacts.require('Oracle');

module.exports = async function (deployer) {
  await deployer.deploy(DataVerification);
  await deployer.deploy(NodeVoting);
  await deployer.deploy(Authentication);

  const dataVerification = await DataVerification.deployed();
  const nodeVoting = await NodeVoting.deployed();
  const authentication = await Authentication.deployed();

  await deployer.deploy(NumericIntegration, dataVerification.address);
  await deployer.deploy(StringIntegration, nodeVoting.address);
  await deployer.deploy(
    NumericProcess,
    authentication.address,
    NumericIntegration.address
  );
  await deployer.deploy(
    StringProcess,
    authentication.address,
    StringIntegration.address
  );
  await deployer.deploy(
    ProvideEvent,
    NumericProcess.address,
    StringProcess.address
  );

  const numericProcess = await NumericProcess.deployed();
  const stringProcess = await StringProcess.deployed();

  await deployer.deploy(Oracle, numericProcess.address, stringProcess.address);
};
