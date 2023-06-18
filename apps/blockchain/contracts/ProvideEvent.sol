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

    function getNumericQuestions() external view returns (uint256[] memory, string[] memory) {
        return numericProcess.getQuestions();
    }

    function getStringQuestions() external view returns (uint256[] memory, string[] memory) {
        return stringProcess.getQuestions();
    }
}