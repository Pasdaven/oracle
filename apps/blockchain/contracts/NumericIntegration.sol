// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./DataVerification.sol";

contract NumericIntegration {

    DataVerification private dataVerification;

    constructor(address _dataVerificationAddr) {
        dataVerification = DataVerification(_dataVerificationAddr);
    }

    function dataIntergration(uint256 _questionId, address _callBackAddress) external {
        dataVerification.sendAnswerToDApp(_questionId, _callBackAddress);
    }
}
