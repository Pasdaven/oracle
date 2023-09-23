import * as deploy from '../lib/deploy';

async function main() {
  const addressRecord = await deploy.addressRecordContract();
  console.log('AddressRecord deployed to:', addressRecord.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
