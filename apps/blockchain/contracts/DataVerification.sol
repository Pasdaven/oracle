// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Oracle.sol";
import "./Authentication.sol";

contract DataVerification {

    Oracle private oracle;

    constructor(address _oracleAddr) {
        oracle = Oracle(_oracleAddr);
    }

    function returnResultToOracle(uint256 _questionId) external {
        oracle.sendAnswerToDApp(_questionId, "answer");
    }
}
