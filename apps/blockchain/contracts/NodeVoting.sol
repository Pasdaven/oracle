// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './CountdownTimer.sol';

contract NodeVoting {
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
    string[] memory _answers
  ) external {
    dataManager.setVoteEvent(_questionId, DataManager.VoteType.InProgress);
    emit VoteEvent(_questionId, address(this));
    // start timer for question
    uint256 _startTime = countdownTimer.startTimer();
    // call other service to regularly check if timer is expired, pass in questionId, callBackAddress, startTime, answers
  }

  function checkAndEndVoteEvent(
    uint256 _questionId,
    address _callBackAddress,
    uint256 _startTime,
    string[] memory _answers
  ) external {
    DataManager.VoteType _voteType = dataManager.getVoteEvent(_questionId);
    require(
      _voteType == DataManager.VoteType.InProgress,
      'vote event is not in progress'
    );
    if (countdownTimer.checkTimerExpired(_startTime)) {
      dataManager.setVoteEvent(_questionId, DataManager.VoteType.Finished);
      // call other service to end specific vote event, pass in questionId and callBackAddress

      // check if the vote is approved
      // calculateFinalAnswer(_questionId);
      if (checkVoteApproved(_questionId)) {
        string memory _answer = dataManager.getFinalStringAnswer(_questionId);
        sendAnswerToDApp(_questionId, _callBackAddress, _answer);
        // call RewardPunishment contract to reward or punish
      } else {
        // numericProcess.createQuestionEvent
      }
    }
  }

  function sendAnswerToDApp(
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

  function vote(
    uint256 _questionId,
    address _voter,
    DataManager.VoteValue _voteValue
  ) external returns (bool) {
    return dataManager.setVote(_questionId, _voter, _voteValue);
  }

  function calculateFinalAnswer(uint256 _questionId) public view {
    // TODO: implement
    // string memory _answer = '';
    // dataManager.setFinalStringAnswer(_questionId, _answer);
  }

  function checkVoteApproved(uint256 _questionId) public pure returns (bool) {
    // TODO: implement
  }
}
