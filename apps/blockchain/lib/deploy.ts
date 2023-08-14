import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';

export async function deployContract(
    contractName: string,
    ...contractArgs: Contract[]
): Promise<Contract> {
    const ContractFactory: ContractFactory = await ethers.getContractFactory(
        contractName
    );
    let contract: Contract;

    if (contractArgs.length) {
        const contractParams: string[] = [];
        for (const ca of contractArgs) {
            contractParams.push(ca.address);
        }
        contract = await ContractFactory.deploy(...contractParams);
    } else {
        contract = await ContractFactory.deploy();
    }

    await contract.deployed();
    return contract;
}

export async function authenticationContract(): Promise<Contract> {
    return await deployContract('Authentication');
}

export async function numericIntegrationContract(): Promise<Contract> {
    return await deployContract('NumericIntegration');
}

export async function stringIntegrationContract(): Promise<Contract> {
    return await deployContract('StringIntegration');
}

export async function numericProcessContract(
    authentication?: Contract,
    numericIntegration?: Contract
): Promise<Contract> {
    if (typeof authentication === 'undefined') {
        authentication = await authenticationContract();
        numericIntegration = await numericIntegrationContract();
    } else if (typeof numericIntegration === 'undefined') {
        numericIntegration = await numericIntegrationContract();
    }
    return await deployContract(
        'NumericProcess',
        authentication,
        numericIntegration
    );
}

export async function stringProcessContract(
    authentication?: Contract,
    stringIntegration?: Contract
): Promise<Contract> {
    if (typeof authentication === 'undefined') {
        authentication = await authenticationContract();
        stringIntegration = await stringIntegrationContract();
    } else if (typeof stringIntegration === 'undefined') {
        stringIntegration = await stringIntegrationContract();
    }
    return await deployContract(
        'StringProcess',
        authentication,
        stringIntegration
    );
}

export async function provideEventContract(
    numericProcess?: Contract,
    stringProcess?: Contract
): Promise<Contract> {
    if (
        typeof numericProcess === 'undefined' ||
        typeof stringProcess === 'undefined'
    ) {
        const authentication = await authenticationContract();
        numericProcess = await numericProcessContract(authentication);
        stringProcess = await stringProcessContract(authentication);
    }
    return await deployContract('ProvideEvent', numericProcess, stringProcess);
}

export async function controllerContract(
    authentication?: Contract,
    numericProcess?: Contract,
    stringProcess?: Contract,
    provideEvent?: Contract
): Promise<Contract> {
    if (typeof authentication === 'undefined') {
        authentication = await authenticationContract();
        numericProcess = await numericProcessContract(authentication);
        stringProcess = await stringProcessContract(authentication);
        provideEvent = await provideEventContract(
            numericProcess,
            stringProcess
        );
    } else if (
        typeof numericProcess === 'undefined' ||
        typeof stringProcess === 'undefined' ||
        typeof provideEvent === 'undefined'
    ) {
        numericProcess = await numericProcessContract(authentication);
        stringProcess = await stringProcessContract(authentication);
        provideEvent = await provideEventContract(
            numericProcess,
            stringProcess
        );
    }
    return await deployContract(
        'Controller',
        authentication,
        numericProcess,
        stringProcess,
        provideEvent
    );
}

export async function oracleContract(
    numericProcess?: Contract,
    stringProcess?: Contract
): Promise<Contract> {
    if (
        typeof numericProcess === 'undefined' ||
        typeof stringProcess === 'undefined'
    ) {
        const authentication = await authenticationContract();
        numericProcess = await numericProcessContract(authentication);
        stringProcess = await stringProcessContract(authentication);
    }
    return await deployContract('Oracle', numericProcess, stringProcess);
}

export async function addressRecordContract(): Promise<Contract> {
    return await deployContract('AddressRecord');
}
