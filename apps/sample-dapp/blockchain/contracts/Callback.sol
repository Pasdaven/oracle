// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract Callback {
  function receiveNumericAnswer(
    uint256 _questionId,
    uint256 _finalAnswer
  ) public {
    console.log('receiveNumericAnswer: ', _questionId, _finalAnswer);
  }

  function receiveStringAnswer(
    uint256 _questionId,
    string memory _finalAnswer
  ) public {
    console.log('receiveStringAnswer: ', _questionId, _finalAnswer);
  }

  function receiveAnswer(string memory res) public {
    console.log('Received from oracle: %s', res);
  }
}
