import * as deploy from '../lib/deploy';

async function main() {
    const authentication = await deploy.authenticationContract();
    const numericIntegration = await deploy.numericIntegrationContract();
    const stringIntegration = await deploy.stringIntegrationContract();
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
    await deploy.controllerContract(
        authentication,
        numericProcess,
        stringProcess,
        provideEvent
    );
    const oracle = await deploy.oracleContract(numericProcess, stringProcess);
    console.log('Oracle deployed to:', oracle.address);

    const addressRecord = await deploy.addressRecordContract();
    addressRecord.setLatestDeployAddress(oracle.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
