// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./NumericProcess.sol";
import "./StringProcess.sol";

contract ProvideEvent {

    NumericProcess private numericProcess;
    StringProcess private stringProcess;

    constructor(address _numericProcessAddr, address _stringProcessAddr) {
        numericProcess = NumericProcess(_numericProcessAddr);
        stringProcess = StringProcess(_stringProcessAddr);
    }

    function getNumericQuestions(address _walletAddress) external view returns (uint256[] memory, string[] memory) {
        return numericProcess.getQuestions(_walletAddress);
    }

    function getStringQuestions(address _walletAddress) external view returns (uint256[] memory, string[] memory) {
        return stringProcess.getQuestions(_walletAddress);
    }
}