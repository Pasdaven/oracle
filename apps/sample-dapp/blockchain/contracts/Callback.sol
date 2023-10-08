// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract Callback {
  uint256 public intAnswer;
  string public strAnswer;

  function receiveNumericAnswer(
    uint256 _questionId,
    uint256 _finalAnswer
  ) public {
    intAnswer = _finalAnswer;
    console.log('receiveNumericAnswer: ', _questionId, _finalAnswer);
  }

  function receiveStringAnswer(
    uint256 _questionId,
    string memory _finalAnswer
  ) public {
    strAnswer = _finalAnswer;
    console.log('receiveStringAnswer: ', _questionId, _finalAnswer);
  }

  function getNumericAnswer() public view returns (uint256) {
    return intAnswer;
  }

  function getStringAnswer() public view returns (string memory) {
    return strAnswer;
  }
}
