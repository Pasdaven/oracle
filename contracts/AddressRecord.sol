// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AddressRecord {
    address[] public latestAddressRecord;
    function getLatestDeployAddress(address latestDeployAddress) external returns (string memory) {
        latestAddressRecord.push(latestDeployAddress);
        return "success";
    }
}