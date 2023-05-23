import { ethers, artifacts } from 'hardhat';
import { Contract, ContractFactory, ethers as e } from 'ethers';



async function main() {
    
    const numericIntegration = await deployContract('contracts/NumericIntegration.sol:NumericIntegration');
    const stringIntegration = await deployContract('contracts/StringIntegration.sol:StringIntegration');

    const numericProcess = await deployContract('contracts/NumericProcess.sol:NumericProcess', numericIntegration);
    const stringProcess = await deployContract('contracts/StringProcess.sol:StringProcess', stringIntegration);

    const oracle = await deployContract('contracts/Oracle.sol:Oracle', numericProcess, stringProcess);
}

async function deployContract(contractName: string, ...contractArr: Contract[]): Promise<Contract> {
    const ContractFactory: ContractFactory = await ethers.getContractFactory(contractName);
    let contract: Contract;
    
    if (contractArr.length) {
        const contractAddrParams: any[] = [];
        for (const contract of contractArr) {
            contractAddrParams.push(contract.address);
        }
        contract = await ContractFactory.deploy(...contractAddrParams);
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
