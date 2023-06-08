import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Oracle, Oracle__factory } from '../typechain-types';

describe('Oracle', function () {
    let Oracle: Oracle__factory;
    let oracle: Oracle;

    beforeEach(async () => {
        // Deploy NumericIntegration contracts
        const NumericIntegration = await ethers.getContractFactory(
            'contracts/NumericIntegration.sol:NumericIntegration'
        );
        const numericIntegration = await NumericIntegration.deploy();
        await numericIntegration.deployed();

        // Deploy StringIntegration contracts
        const StringIntegration = await ethers.getContractFactory(
            'contracts/StringIntegration.sol:StringIntegration'
        );
        const stringIntegration = await StringIntegration.deploy();
        await stringIntegration.deployed();

        // Deploy Authentication contract
        const Authentication = await ethers.getContractFactory(
            'contracts/Authentication.sol:Authentication'
        );
        const authentication = await Authentication.deploy();
        await authentication.deployed();

        // Deploy NumericProcess contract
        const NumericProcess = await ethers.getContractFactory(
            'contracts/NumericProcess.sol:NumericProcess'
        );
        const numericProcess = await NumericProcess.deploy(
            numericIntegration.address,
            authentication.address
        );
        await numericProcess.deployed();

        // Deploy StringProcess contract
        const StringProcess = await ethers.getContractFactory(
            'contracts/StringProcess.sol:StringProcess'
        );
        const stringProcess = await StringProcess.deploy(
            stringIntegration.address,
            authentication.address
        );
        await stringProcess.deployed();

        Oracle = await ethers.getContractFactory('Oracle');
        oracle = await Oracle.deploy(
            numericProcess.address,
            stringProcess.address
        );
        await oracle.deployed();
    });

    describe('processRequest', function () {
        it('should return an error for an invalid data type', async () => {
            const data = {
                dataType: 'Boolean',
                question: 'false',
                callBackAddress: '0x1234567890123456789012345678901234567890',
            };
            const expectedResponse = {
                status: 'invalid',
                message: 'Invalid data type',
            };

            await oracle.processRequest(data);
            const result = await oracle.getResponses();
            const callBackAddress = await oracle.getCallbackAddressByIndex(
                result.requestIndex
            );
            expect(result.status).to.equal(expectedResponse.status);
            expect(result.message).to.equal(expectedResponse.message);
            expect(callBackAddress).to.equal(data.callBackAddress);
        });
    });

    describe('checkDataType', function () {
        it('should return "Invalid data type" for unsupported data types', async () => {
            const data = {
                dataType: 'Boolean',
                question: 'false',
                callBackAddress: '0x1234567890123456789012345678901234567890',
            };
            const expectedResponse = {
                status: 'invalid',
                message: 'Invalid data type',
            };
            const response = await oracle.checkDataType(data);
            const result = {
                status: response.status,
                message: response.message,
            };
            expect(result).to.eql(expectedResponse);
        });

        it('should return a valid response for supported data types', async () => {
            const numericData = {
                dataType: 'Numeric',
                question: '123',
                callBackAddress: '0x1234567890123456789012345678901234567890',
            };
            const stringData = {
                dataType: 'String',
                question: 'Hello world!',
                callBackAddress: '0x1234567890123456789012345678901234567890',
            };
            const expectedResponse = {
                status: 'valid',
                message: 'Valid data type',
            };
            let response = await oracle.checkDataType(numericData);
            const numericResult = {
                status: response.status,
                message: response.message,
            };
            expect(numericResult).to.eql(expectedResponse);

            response = await oracle.checkDataType(stringData);
            const stringResult = {
                status: response.status,
                message: response.message,
            };
            expect(stringResult).to.eql(expectedResponse);
        });
    });
});
