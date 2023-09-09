// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'truffle/console.sol';
import "./Oracle.sol";
import "./Authentication.sol";

contract NodeVoting {

    event ResponseEvent(bool success, bytes data);
    function sendAnswerToDApp(uint256 _questionId, address _callBackAddress) external payable {
        (bool success, bytes memory data) = _callBackAddress.call{value: msg.value}(
            abi.encodeWithSignature("receiveAnswer(string)", "answer")
        );
        emit ResponseEvent(success, data);
    }
}
