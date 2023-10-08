// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './CountdownTimer.sol';

contract DataVerification {
  // Events
  event ResponseEvent(bool success, bytes data);
  event VoteEvent(uint256 questionId, address contractAddr);

  // Variables
  DataManager private dataManager;
  CountdownTimer private countdownTimer;

  // Constructor
  constructor(address _dataManagerAddr, address _countdownTimerAddr) {
    dataManager = DataManager(_dataManagerAddr);
    countdownTimer = CountdownTimer(_countdownTimerAddr);
  }

  // Functions
  function sendNumericAnswerToDApp(
    uint256 _questionId,
    address _callBackAddress,
    uint256 _finalAnswer
  ) public payable {
    (bool success, bytes memory data) = _callBackAddress.call{value: msg.value}(
      abi.encodeWithSignature(
        'receiveNumericAnswer(uint256, uint256)',
        _questionId,
        _finalAnswer
      )
    );
    emit ResponseEvent(success, data);
  }

  function sendStringAnswerToDApp(
    uint256 _questionId,
    address _callBackAddress,
    string memory _answer
  ) public payable {
    (bool success, bytes memory data) = _callBackAddress.call{value: msg.value}(
      abi.encodeWithSignature(
        'receiveAnswer(uint256, string memory)',
        _questionId,
        _answer
      )
    );
    emit ResponseEvent(success, data);
  }

  // function calculateVoteResult(uint256 _questionId) public view returns (bool) {
  //   // TODO: implement
  // }

  // function calculateFinalAnswer(uint256 _questionId) public view {
  //   // TODO: implement
  //   // string memory _answer = '';
  //   // dataManager.setFinalStringAnswer(_questionId, _answer);
  // }

  // function checkVoteApproved(uint256 _questionId) public pure returns (bool) {
  //   // TODO: implement
  // }
}
