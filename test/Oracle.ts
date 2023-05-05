import { ethers } from "hardhat";
import { expect } from "chai";

describe("Oracle", function () {
  let oracle: any;

  beforeEach(async () => {
    const Oracle = await ethers.getContractFactory("Oracle");
    oracle = await Oracle.deploy();
    await oracle.deployed();
  });

  describe("checkDataType", function () {
    it('should return "Invalid data type" for unsupported data types', async () => {
      const data = { dataType: "Boolean", content: "false" };
      const expectedResponse = {
        status: "invalid",
        message: "Invalid data type",
      };
      const response = await oracle.checkDataType(data);
      let result = {
        status: response.status,
        message: response.message,
      };
      expect(result).to.eql(expectedResponse);
    });

    it("should return a valid response for supported data types", async () => {
      const numericData = { dataType: "Numeric", content: "123" };
      const stringData = { dataType: "String", content: "Hello world!" };
      const expectedResponse = { status: "valid", message: "Valid data type" };
      let response = await oracle.checkDataType(numericData);
      let result = {
        status: response.status,
        message: response.message,
      };
      expect(result).to.eql(expectedResponse);

      response = await oracle.checkDataType(stringData);
      result = {
        status: response.status,
        message: response.message,
      };
      expect(result).to.eql(expectedResponse);
    });
  });
});
