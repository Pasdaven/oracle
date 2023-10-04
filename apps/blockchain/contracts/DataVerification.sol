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
  function createVoteEvent(
    uint256 _questionId,
    address _callBackAddress,
    uint256 _finalAnswer
  ) external {
    dataManager.setVoteEvent(_questionId, DataManager.VoteType.InProgress);
    emit VoteEvent(_questionId, address(this));
    // start timer for question
    uint256 _startTime = countdownTimer.startTimer();
    // call other service to regularly check if timer is expired, pass in questionId, callBackAddress, startTime, finalAnswer
  }

  function checkAndEndVoteEvent(
    uint256 _questionId,
    address _callBackAddress,
    uint256 _startTime,
    uint256 _finalAnswer
  ) external {
    DataManager.VoteType _voteType = dataManager.getVoteEvent(_questionId);
    require(
      _voteType == DataManager.VoteType.InProgress,
      'vote event is not in progress'
    );
    if (countdownTimer.checkTimerExpired(_startTime)) {
      dataManager.setVoteEvent(_questionId, DataManager.VoteType.Finished);
      // call other service to end specific vote event, pass in questionId and callBackAddress

      bool _voteApproved = calculateVoteResult(_questionId);

      if (_voteApproved) {
        dataManager.setFinalNumericAnswer(_questionId, _finalAnswer);
        sendAnswerToDApp(_questionId, _callBackAddress, _finalAnswer);
        // call RewardPunishment contract to reward or punish
        // questionId, isOutliers = false user
      } else {
        // numericProcess.createQuestionEvent
      }
    }
  }

  function sendAnswerToDApp(
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

  function vote(
    uint256 _questionId,
    address _voter,
    DataManager.VoteValue _voteValue
  ) external returns (bool) {
    return dataManager.setVote(_questionId, _voter, _voteValue);
  }

  function calculateVoteResult(uint256 _questionId) public view returns (bool) {
    // TODO: implement
  }
}
