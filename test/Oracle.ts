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
        it('should process a Numeric request', async () => {
            const data = { dataType: 'Numeric', content: '123' };
            const expectedResponse = {
                status: 'success',
                message: 'Numeric function executed successfully',
            };

            await oracle.processRequest(data);
            const result = await oracle.getResponses();
            expect(result.status).to.equal(expectedResponse.status);
            expect(result.message).to.equal(expectedResponse.message);
        });

        it('should process a String request', async () => {
            const data = { dataType: 'String', content: 'Hello world!' };
            const expectedResponse = {
                status: 'success',
                message: 'String function executed successfully',
            };

            await oracle.processRequest(data);
            const result = await oracle.getResponses();
            expect(result.status).to.equal(expectedResponse.status);
            expect(result.message).to.equal(expectedResponse.message);
        });

        it('should return an error for an invalid data type', async () => {
            const data = { dataType: 'Boolean', content: 'false' };
            const expectedResponse = {
                status: 'invalid',
                message: 'Invalid data type',
            };

            await oracle.processRequest(data);
            const result = await oracle.getResponses();
            expect(result.status).to.equal(expectedResponse.status);
            expect(result.message).to.equal(expectedResponse.message);
        });
    });

    describe('checkDataType', function () {
        it('should return "Invalid data type" for unsupported data types', async () => {
            const data = { dataType: 'Boolean', content: 'false' };
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
            const numericData = { dataType: 'Numeric', content: '123' };
            const stringData = { dataType: 'String', content: 'Hello world!' };
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
