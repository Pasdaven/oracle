// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './NumericProcess.sol';
import './StringProcess.sol';
import './Authentication.sol';
import './ProvideEvent.sol';

contract Controller {
  Authentication private authentication;
  NumericProcess private numericProcess;
  StringProcess private stringProcess;
  ProvideEvent private provideEvent;

  constructor(
    address addressOfAuthContract,
    address addressOfNumericContract,
    address addressOfStringContract,
    address addressOfProvideEventContract
  ) {
    authentication = Authentication(addressOfAuthContract);
    numericProcess = NumericProcess(addressOfNumericContract);
    stringProcess = StringProcess(addressOfStringContract);
    provideEvent = ProvideEvent(addressOfProvideEventContract);
  }

  function getNumericEvent(
    address walletAddress
  ) external view returns (uint256[] memory, string[] memory) {
    (uint256[] memory _questionIds, string[] memory _questions) = provideEvent
      .getNumericQuestions(walletAddress);
    return (_questionIds, _questions);
  }

  function getStringEvent(
    address walletAddress
  ) external view returns (uint256[] memory, string[] memory) {
    (uint256[] memory _questionIds, string[] memory _questions) = provideEvent
      .getStringQuestions(walletAddress);
    return (_questionIds, _questions);
  }

  function answerNumericQuestion(
    uint256 questionId,
    uint256 answerContent,
    address walletAddress
  ) external {
    numericProcess.answerQuestion(questionId, answerContent, walletAddress);
  }

  function answerStringQuestion(
    uint256 questionId,
    string memory answerContent,
    address walletAddress
  ) external {
    stringProcess.answerQuestion(questionId, answerContent, walletAddress);
  }

  function auth(address walletAddress) external returns (string memory) {
    authentication.register(walletAddress);
  }
}
