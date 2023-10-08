// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './CountdownTimer.sol';
import './DataVerification.sol';

contract NodeVoting {
  // Events
  event VoteEvent(uint256 questionId, address contractAddr);

  // Variables
  DataManager private dataManager;
  CountdownTimer private countdownTimer;
  DataVerification private dataVerification;

  // Constructor
  constructor(
    address _dataManagerAddr,
    address _countdownTimerAddr,
    address _dataVerificationAddr
  ) {
    dataManager = DataManager(_dataManagerAddr);
    countdownTimer = CountdownTimer(_countdownTimerAddr);
    dataVerification = DataVerification(_dataVerificationAddr);
  }

  // Functions
  function createNumericVoteEvent(
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

  function createStringVoteEvent(
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

  function vote(
    uint256 _questionId,
    address _voter,
    string memory _voteValue
  ) external returns (bool) {
    if (
      keccak256(abi.encodePacked(_voteValue)) ==
      keccak256(abi.encodePacked('Agree'))
    ) {
      return
        dataManager.setVote(_questionId, _voter, DataManager.VoteValue.Agree);
    } else if (
      keccak256(abi.encodePacked(_voteValue)) ==
      keccak256(abi.encodePacked('Disagree'))
    ) {
      return
        dataManager.setVote(
          _questionId,
          _voter,
          DataManager.VoteValue.Disagree
        );
    } else {
      revert('Invalid vote value');
    }
  }

  // function checkAndEndVoteEvent(
  //   uint256 _questionId,
  //   address _callBackAddress,
  //   uint256 _startTime,
  //   string[] memory _answers
  // ) external {
  //   DataManager.VoteType _voteType = dataManager.getVoteEvent(_questionId);
  //   require(
  //     _voteType == DataManager.VoteType.InProgress,
  //     'vote event is not in progress'
  //   );
  //   if (countdownTimer.checkTimerExpired(_startTime)) {
  //     dataManager.setVoteEvent(_questionId, DataManager.VoteType.Finished);
  //     // call other service to end specific vote event, pass in questionId and callBackAddress

  //     // check if the vote is approved
  //     // calculateFinalAnswer(_questionId);
  //     if (checkVoteApproved(_questionId)) {
  //       string memory _answer = dataManager.getFinalStringAnswer(_questionId);
  //       sendAnswerToDApp(_questionId, _callBackAddress, _answer);
  //       // call RewardPunishment contract to reward or punish
  //     } else {
  //       // numericProcess.createQuestionEvent
  //     }
  //   }
  // }

  // function checkAndEndVoteEvent(
  //   uint256 _questionId,
  //   address _callBackAddress,
  //   uint256 _startTime,
  //   uint256 _finalAnswer
  // ) external {
  //   DataManager.VoteType _voteType = dataManager.getVoteEvent(_questionId);
  //   require(
  //     _voteType == DataManager.VoteType.InProgress,
  //     'vote event is not in progress'
  //   );
  //   if (countdownTimer.checkTimerExpired(_startTime)) {
  //     dataManager.setVoteEvent(_questionId, DataManager.VoteType.Finished);
  //     // call other service to end specific vote event, pass in questionId and callBackAddress

  //     bool _voteApproved = calculateVoteResult(_questionId);

  //     if (_voteApproved) {
  //       dataManager.setFinalNumericAnswer(_questionId, _finalAnswer);
  //       sendAnswerToDApp(_questionId, _callBackAddress, _finalAnswer);
  //       // call RewardPunishment contract to reward or punish
  //       // questionId, isOutliers = false user
  //     } else {
  //       // numericProcess.createQuestionEvent
  //     }
  //   }
  // }
}
