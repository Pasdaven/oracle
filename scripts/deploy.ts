import { ethers } from 'hardhat';
import { Contract, ContractFactory, ethers as e } from 'ethers';

interface contractParams {
    abi: e.utils.BytesLike;
    address: string;
}

async function main() {

    const numericIntegration = await deployContract('NumericIntegration');

    const stringIntegration = await deployContract('StringIntegration');

    const numericProcess = await deployContract('NumericProcess', numericIntegration);
    console.log(numericProcess.abi);
    console.log(numericProcess.address);

    // const stringProcess = await deployContract('StringProcess', stringIntegration);

    // const oracle = await deployContract('Oracle', numericProcess, stringProcess);

}

async function deployContract(contractName: string, ...contractParamsArr: contractParams[]): Promise<contractParams> {
    const ContractFactory: ContractFactory = await ethers.getContractFactory(contractName);
    let contract: Contract;
    
    if (contractParamsArr.length) {
        const deployParams: any[] = [];
        for (const contractParams of contractParamsArr) {
            deployParams.push(contractParams.abi, contractParams.address);
        }
        contract = await ContractFactory.deploy(...deployParams);
    } else {
        contract = await ContractFactory.deploy();
    }
    await contract.deployed();
    return { abi: convertABItoBytes(ContractFactory.interface.fragments), address: contract.address };
}

function convertABItoBytes(abi: readonly e.utils.Fragment[]): e.utils.BytesLike {
    const abiBytes = ethers.utils.defaultAbiCoder.encode(['string'], [JSON.stringify(abi)]);
    return abiBytes;
}

function convertToSolidityBytes(fragments: e.utils.Fragment[]): string {
    // const abiEncodedData = e.utils.defaultAbiCoder.encode(fragments.map(fragment => fragment.format));
    const abiEncodedData = e.utils.defaultAbiCoder.encode(fragments.map(fragment => fragment.type), fragments.map(() => 0));

    const solidityBytes = e.utils.hexlify(e.utils.concat([e.utils.hexZeroPad(e.utils.hexStripZeros(abiEncodedData), 32), e.utils.hexValue(fragments.length)]));

    return solidityBytes;
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
