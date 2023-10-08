import { ethers } from 'hardhat';

async function main() {
  const CallbackContract = await ethers.getContractFactory('Callback');
  const callbackContract = await CallbackContract.deploy();
  console.log('CallbackContract deployed to:', callbackContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
