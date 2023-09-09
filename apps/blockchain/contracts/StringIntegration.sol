// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./NodeVoting.sol";


contract StringIntegration {

    NodeVoting private nodeVoting;

    constructor(address _nodeVotingAddr) {
        nodeVoting = NodeVoting(_nodeVotingAddr);
    }

    function dataIntergration(uint256 _questionId, address _callBackAddress) external {
        nodeVoting.sendAnswerToDApp(_questionId, _callBackAddress);
    }

}
