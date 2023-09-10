import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Oracle, Oracle__factory } from '../typechain-types';
import * as deploy from '../lib/deploy';
import statusCodes from '../constants/oracle-status-code.json';

describe('Oracle', function () {
  let Oracle: Oracle__factory;
  let oracle: Oracle;

  beforeEach(async () => {
    const oracleContract = await deploy.oracleContract();
    Oracle = await ethers.getContractFactory('Oracle');
    oracle = Oracle.attach(oracleContract.address);
  });

  describe('processRequest', function () {
    it('should return an error for an invalid data type', async () => {
      const data = {
        dataType: 'Boolean',
        question: 'false',
        callBackAddress: '0x1234567890123456789012345678901234567890',
      };
      const expectedResponse = {
        status: statusCodes.Client.QUESTION_CREATED_FAILURE.code,
        message: statusCodes.Client.QUESTION_CREATED_FAILURE.message,
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

    it('should return valid data type', async () => {
      const data = {
        dataType: 'String',
        question: 'false',
        callBackAddress: '0x1234567890123456789012345678901234567890',
      };
      const expectedResponse = {
        status: statusCodes.Client.QUESTION_CREATED_SUCCESS.code,
        message: statusCodes.Client.QUESTION_CREATED_SUCCESS.message,
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
        status: statusCodes.System.INVALID_DATA_TYPE.code,
        message: statusCodes.System.INVALID_DATA_TYPE.message,
      };
      const response = await oracle.checkDataType(data);
      const result = {
        status: response.status.toNumber(),
        message: response.message.toString(),
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
        status: statusCodes.System.VALID_DATA_TYPE.code,
        message: statusCodes.System.VALID_DATA_TYPE.message,
      };
      let response = await oracle.checkDataType(numericData);
      const numericResult = {
        status: response.status.toNumber(),
        message: response.message.toString(),
      };
      expect(numericResult).to.eql(expectedResponse);

      response = await oracle.checkDataType(stringData);
      const stringResult = {
        status: response.status.toNumber(),
        message: response.message.toString(),
      };
      expect(stringResult).to.eql(expectedResponse);
    });
  });
});
