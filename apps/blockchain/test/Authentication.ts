import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';

describe('Authentication', function () {
  let authentication: Contract;
  beforeEach(async () => {
    const Authentication = await ethers.getContractFactory('Authentication');
    authentication = await Authentication.deploy();
    await authentication.deployed();
  });

  describe('register', function () {
    this.beforeEach(async () => {
      const registeredAddress = '0x1234567890123456789012345678901234567890';
      await authentication.register(registeredAddress);
    });

    it('should return true for a valid address', async () => {
      const address = '0x0987654321098765432109876543210987654321';
      await expect(authentication.register(address))
        .to.emit(authentication, 'Register')
        .withArgs(true);
    });

    it('should return false for an invalid address', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      await expect(authentication.register(address))
        .to.emit(authentication, 'Register')
        .withArgs(false);
    });
  });

  describe('getUsers', function () {
    it('should return an array of addresses', async () => {
      const result = await authentication.getUsers();
      expect(result).to.be.an('array');
    });
  });

  describe('verifyUserIsRegistered', function () {
    it('should return true for a registered address', async () => {
      const registeredAddress = '0x1234567890123456789012345678901234567890';
      await authentication.register(registeredAddress);
      const result = await authentication.verifyUserIsRegistered(
        registeredAddress
      );
      expect(result).to.equal(true);
    });

    it('should return false for an unregistered address', async () => {
      const unregisteredAddress = '0x0987654321098765432109876543210987654321';
      const result = await authentication.verifyUserIsRegistered(
        unregisteredAddress
      );
      expect(result).to.equal(false);
    });
  });
});
