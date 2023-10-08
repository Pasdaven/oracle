import * as deploy from '../lib/deploy';
import fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

const envFilePath = path.join(__dirname, '../.env');

async function main() {
  const addressRecord = await deploy.addressRecordContract();
  console.log('AddressRecord deployed to:', addressRecord.address);

  dotenv.config();
  const rawEnvData = dotenv.parse(fs.readFileSync(envFilePath));
  rawEnvData.ADDRESS_RECORD_CONTRACT_ADDRESS = addressRecord.address;
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
