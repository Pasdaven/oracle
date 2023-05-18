import { ethers } from 'hardhat';
// import { Contract } from 'hardhat/internal/hardhat-network/stack-traces/model';

async function main() {

    const numericIntegration = await deployContract('NumericIntegration');
    const stringIntegration = await deployContract('StringIntegration');

    const numericProcess = await deployContract('NumericProcess', numericIntegration);
    const stringProcess = await deployContract('StringProcess', stringIntegration);

    const oracle = await deployContract('Oracle', numericProcess, stringProcess);

}

async function deployContract(contractName: string, ...constructorContract: Contract[]): Promise<Contract> {
    const ContractFactory = await ethers.getContractFactory(contractName);
    let contract;
    if (!constructorContract.length) {
        contract = await ContractFactory.deploy();
    } else {
        contract = await ContractFactory.deploy();
    }
    await contract.deployed();
    return contract;
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
