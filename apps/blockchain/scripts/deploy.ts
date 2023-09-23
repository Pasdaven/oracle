import { ethers } from 'hardhat';
import dotenv from 'dotenv';
import * as deploy from '../lib/deploy';
import addressRecordAbi from '../artifacts/contracts/AddressRecord.sol/AddressRecord.json';

dotenv.config();

async function main() {
  const dataVerification = await deploy.dataVerificationContract();
  const nodeVoting = await deploy.nodeVotingContract();
  const authentication = await deploy.authenticationContract();
  const numericIntegration = await deploy.numericIntegrationContract(
    dataVerification
  );
  const stringIntegration = await deploy.stringIntegrationContract(nodeVoting);
  const numericProcess = await deploy.numericProcessContract(
    authentication,
    numericIntegration
  );
  const stringProcess = await deploy.stringProcessContract(
    authentication,
    stringIntegration
  );
  const provideEvent = await deploy.provideEventContract(
    numericProcess,
    stringProcess
  );

  const controller = await deploy.controllerContract(
    authentication,
    numericProcess,
    stringProcess,
    provideEvent
  );
  const oracle = await deploy.oracleContract(numericProcess, stringProcess);
  console.log('Oracle deployed to:', oracle.address);
  console.log('Controller deployed to:', controller.address);

  const addressRecordAddress = process.env.ADDRESS_RECORD_CONTRACT_ADDRESS; // Replace with the actual address of your AddressRecord contract
  const providerUrl = process.env.PROVIDER_URL; // Replace with your Ethereum JSON-RPC URL
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = provider.getSigner();
  const addressRecord = new ethers.Contract(
    addressRecordAddress as string,
    addressRecordAbi.abi,
    signer
  );
  await addressRecord.setLatestDeployAddress(oracle.address);
  await addressRecord.getLatestDeployAddress();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
