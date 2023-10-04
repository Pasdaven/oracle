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
    if (contractName === 'CountdownTimer') {
      contract = await ContractFactory.deploy(contractArgs[0]);
    } else {
      const contractParams: string[] = [];
      for (const contractArg of contractArgs) {
        contractParams.push(contractArg.address);
      }
      contract = await ContractFactory.deploy(...contractParams);
    }
  } else {
    contract = await ContractFactory.deploy();
  }

  await contract.deployed();
  return contract;
}

export async function dataManagerContract(): Promise<Contract> {
  return await deployContract('DataManager');
}

export async function countdownTimerContract(): Promise<Contract> {
  // 1 hour
  return await deployContract('CountdownTimer', 3600);
}

export async function authenticationContract(
  dataManager?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
  }
  return await deployContract('Authentication', dataManager);
}

export async function dataVerificationContract(
  dataManager?: Contract,
  countdownTimer?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    countdownTimer = await countdownTimerContract();
  } else if (typeof countdownTimer === 'undefined') {
    countdownTimer = await countdownTimerContract();
  }
  return await deployContract('DataVerification', dataManager, countdownTimer);
}

export async function nodeVotingContract(
  dataManager?: Contract,
  countdownTimer?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    countdownTimer = await countdownTimerContract();
  } else if (typeof countdownTimer === 'undefined') {
    countdownTimer = await countdownTimerContract();
  }
  return await deployContract('NodeVoting', dataManager, countdownTimer);
}

export async function numericIntegrationContract(
  dataManager?: Contract,
  authentication?: Contract,
  dataVerification?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    authentication = await authenticationContract(dataManager);
    dataVerification = await dataVerificationContract(dataManager);
  } else if (
    typeof authentication === 'undefined' ||
    typeof dataVerification === 'undefined'
  ) {
    authentication = await authenticationContract(dataManager);
    dataVerification = await dataVerificationContract(dataManager);
  }
  return await deployContract(
    'NumericIntegration',
    dataManager,
    authentication,
    dataVerification
  );
}

export async function stringFilteringContract(
  dataManager?: Contract,
  nodeVoting?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    nodeVoting = await nodeVotingContract(dataManager);
  } else if (typeof nodeVoting === 'undefined') {
    nodeVoting = await nodeVotingContract(dataManager);
  }
  return await deployContract('StringFiltering', dataManager, nodeVoting);
}

export async function numericProcessContract(
  dataManager?: Contract,
  countdownTimer?: Contract,
  numericIntegration?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    countdownTimer = await countdownTimerContract();
    numericIntegration = await numericIntegrationContract(
      dataManager,
      countdownTimer
    );
  } else if (
    typeof countdownTimer === 'undefined' ||
    typeof numericIntegration === 'undefined'
  ) {
    countdownTimer = await countdownTimerContract();
    numericIntegration = await numericIntegrationContract(
      dataManager,
      countdownTimer
    );
  }
  return await deployContract(
    'NumericProcess',
    dataManager,
    countdownTimer,
    numericIntegration
  );
}

export async function stringProcessContract(
  dataManager?: Contract,
  countdownTimer?: Contract,
  stringFiltering?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    countdownTimer = await countdownTimerContract();
    stringFiltering = await stringFilteringContract(dataManager);
  } else if (
    typeof countdownTimer === 'undefined' ||
    typeof stringFiltering === 'undefined'
  ) {
    countdownTimer = await countdownTimerContract();
    stringFiltering = await stringFilteringContract(dataManager);
  }
  return await deployContract(
    'StringProcess',
    dataManager,
    countdownTimer,
    stringFiltering
  );
}

export async function controllerContract(
  dataManager?: Contract,
  authentication?: Contract,
  dataVerification?: Contract,
  nodeVoting?: Contract,
  numericIntegration?: Contract,
  stringFiltering?: Contract,
  numericProcess?: Contract,
  stringProcess?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    authentication = await authenticationContract(dataManager);
    dataVerification = await dataVerificationContract(dataManager);
    nodeVoting = await nodeVotingContract(dataManager);
    numericIntegration = await numericIntegrationContract(
      dataManager,
      authentication,
      dataVerification
    );
    stringFiltering = await stringFilteringContract(dataManager, nodeVoting);
    numericProcess = await numericProcessContract(
      dataManager,
      numericIntegration
    );
    stringProcess = await stringProcessContract(dataManager, stringFiltering);
  } else if (
    typeof authentication === 'undefined' ||
    typeof dataVerification === 'undefined' ||
    typeof nodeVoting === 'undefined' ||
    typeof numericIntegration === 'undefined' ||
    typeof stringFiltering === 'undefined' ||
    typeof numericProcess === 'undefined' ||
    typeof stringProcess === 'undefined'
  ) {
    authentication = await authenticationContract(dataManager);
    dataVerification = await dataVerificationContract(dataManager);
    nodeVoting = await nodeVotingContract(dataManager);
    numericIntegration = await numericIntegrationContract(
      dataManager,
      authentication,
      dataVerification
    );
    stringFiltering = await stringFilteringContract(dataManager, nodeVoting);
    numericProcess = await numericProcessContract(
      dataManager,
      numericIntegration
    );
    stringProcess = await stringProcessContract(dataManager, stringFiltering);
  }
  return await deployContract(
    'Controller',
    dataManager,
    authentication,
    dataVerification,
    nodeVoting,
    numericIntegration,
    stringFiltering,
    numericProcess,
    stringProcess
  );
}

export async function oracleContract(
  dataManager?: Contract,
  numericProcess?: Contract,
  stringProcess?: Contract
): Promise<Contract> {
  if (typeof dataManager === 'undefined') {
    dataManager = await dataManagerContract();
    numericProcess = await numericProcessContract(dataManager);
    stringProcess = await stringProcessContract(dataManager);
  } else if (
    typeof numericProcess === 'undefined' ||
    typeof stringProcess === 'undefined'
  ) {
    numericProcess = await numericProcessContract(dataManager);
    stringProcess = await stringProcessContract(dataManager);
  }
  return await deployContract(
    'Oracle',
    dataManager,
    numericProcess,
    stringProcess
  );
}

export async function addressRecordContract(): Promise<Contract> {
  return await deployContract('AddressRecord');
}
