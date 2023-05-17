import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Oracle, Oracle__factory } from '../typechain-types';

describe('Oracle', function () {
    let Oracle: Oracle__factory;
    let oracle: Oracle;

    beforeEach(async () => {
        Oracle = await ethers.getContractFactory('Oracle');
        oracle = await Oracle.deploy();
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
