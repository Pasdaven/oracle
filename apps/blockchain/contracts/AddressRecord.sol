// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AddressRecord {
  address[] public latestAddressRecord;

  function setLatestDeployAddress(
    address latestDeployAddress
  ) external returns (string memory) {
    latestAddressRecord.push(latestDeployAddress);
    return 'success';
  }

  function getLatestDeployAddress() external view returns (address) {
    return latestAddressRecord[latestAddressRecord.length - 1];
  }
}
