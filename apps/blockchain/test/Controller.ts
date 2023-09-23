import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';

describe('Controller Contract', function () {
  let controller: Contract;
  let authentication: Contract;
  let numericProcess: Contract;
  let stringProcess: Contract;
  let provideEvent: Contract;

  beforeEach(async function () {
    const Authentication = await ethers.getContractFactory('Authentication');
    authentication = await Authentication.deploy();
    await authentication.deployed();

    const NumericProcess = await ethers.getContractFactory('NumericProcess');
    const authenticationAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
    const numericIntegrationAddress =
      '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
    numericProcess = await NumericProcess.deploy(
      authenticationAddress,
      numericIntegrationAddress
    );
    await numericProcess.deployed();

    const StringProcess = await ethers.getContractFactory('StringProcess');
    const stringIntegrationAddress =
      '0x0165878A594ca255338adfa4d48449f69242Eb8F';
    stringProcess = await StringProcess.deploy(
      authenticationAddress,
      stringIntegrationAddress
    );
    await stringProcess.deployed();

    const ProvideEvent = await ethers.getContractFactory('ProvideEvent');
    const numericProcessAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
    const stringProcessAddress = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
    provideEvent = await ProvideEvent.deploy(
      numericProcessAddress,
      stringProcessAddress
    );
    await provideEvent.deployed();

    const Controller = await ethers.getContractFactory('Controller');
    const addressOfAuthContract = authentication.address;
    const addressOfNumericContract = numericProcess.address;
    const addressOfStringContract = stringProcess.address;
    const addressOfProvideEventContract = provideEvent.address;

    controller = await Controller.deploy(
      // Pass addresses of other contracts here
      addressOfAuthContract,
      addressOfNumericContract,
      addressOfStringContract,
      addressOfProvideEventContract
    );

    await controller.deployed();
  });

  it('should return numeric questions', async () => {
    const walletAddress = '0x5678901234567890123456789012345678904567';

    // Call the getNumericEvent() function
    const [questionIds, questions] = await controller.getNumericEvent(
      walletAddress
    );

    // Perform assertions on the returned values
    expect(questionIds).to.be.an('array');
    console.log(questionIds);
    expect(questions).to.be.an('array');
    console.log(questions);
  });
});
