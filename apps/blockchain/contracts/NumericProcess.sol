// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './CountdownTimer.sol';
import './NumericIntegration.sol';

contract NumericProcess {
  // Events
  event NumericQuestionEvent(
    uint256 indexed questionId,
    string question,
    address contractAddr
  );

  // Variables
  DataManager private dataManager;
  CountdownTimer private countdownTimer;
  NumericIntegration private numericIntegration;

  // Constructor
  constructor(
    address _dataManagerAddr,
    address _countdownTimerAddr,
    address _numericIntegrationAddr
  ) {
    dataManager = DataManager(_dataManagerAddr);
    countdownTimer = CountdownTimer(_countdownTimerAddr);
    numericIntegration = NumericIntegration(_numericIntegrationAddr);
  }

  // Functions
  function getOpenQuestionsCount(
    DataManager.Question[] memory _questions
  ) private pure returns (uint256) {
    uint256 _count = 0;
    for (uint256 i = 0; i < _questions.length; i++) {
      if (_questions[i].isOpen) {
        _count++;
      }
    }
    return _count;
  }

  function getQuestions()
    external
    view
    returns (uint256[] memory, string[] memory)
  {
    DataManager.Question[] memory _questions = dataManager
      .getNumericQuestions();
    uint256 _openQuestionsCount = getOpenQuestionsCount(_questions);
    uint256[] memory _openQuestionIds = new uint256[](_openQuestionsCount);
    string[] memory _openQuestions = new string[](_openQuestionsCount);
    uint256 _count = 0;
    for (uint256 i = 0; i < _questions.length; i++) {
      if (_questions[i].isOpen) {
        _openQuestionIds[_count] = _questions[i].questionId;
        _openQuestions[_count] = _questions[i].question;
        _count++;
      }
    }
    return (_openQuestionIds, _openQuestions);
  }

  function createQuestionEvent(
    uint256 _questionId,
    string memory _question,
    address _callBackAddress
  ) external {
    dataManager.setQuestion(
      _questionId,
      _question,
      true,
      DataManager.DataType.Numeric
    );
    emit NumericQuestionEvent(_questionId, _question, address(this));
    // start timer for question
    uint256 _startTime = countdownTimer.startTimer();
    // call other service to regularly check if timer is expired, pass in questionId, callBackAddress, startTime
  }

  function checkAndEndQuestionEvent(
    uint256 _questionId,
    address _callBackAddress,
    uint256 _startTime
  ) external {
    DataManager.Question[] memory _questions = dataManager
      .getNumericQuestions();
    require(_questions[_questionId].isOpen, 'Question does not exist');
    if (countdownTimer.checkTimerExpired(_startTime)) {
      dataManager.setQuestionIsOpen(_questionId, false);
      // call other service to end specific question event, pass in questionId and callBackAddress
      numericIntegration.dataIntegration(_questionId, _callBackAddress);
    }
  }
}
