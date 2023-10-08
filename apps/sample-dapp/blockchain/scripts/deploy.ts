import { ethers } from 'hardhat';
import dotenv from 'dotenv';
import fs from 'fs';
import * as path from 'path';

const envFilePath = path.join(__dirname, '../../frontend/.env.local');

async function main() {
  const CallbackContract = await ethers.getContractFactory('Callback');
  const callbackContract = await CallbackContract.deploy();
  console.log('CallbackContract deployed to:', callbackContract.address);

  const rawEnvData = dotenv.parse(fs.readFileSync(envFilePath));
  rawEnvData.VITE_CALLBACK_CONTRACT_ADDRESS = callbackContract.address;
  const envData = Object.keys(rawEnvData)
    .map((key) => `${key}=${rawEnvData[key]}`)
    .join('\n');
  fs.writeFileSync(envFilePath, envData);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
