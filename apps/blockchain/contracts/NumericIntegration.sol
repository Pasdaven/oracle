// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './Authentication.sol';
import './NodeVoting.sol';

contract NumericIntegration {
  // Events
  event AnswerCalculated(uint256 questionId, uint256 finalAnswer);

  // Variables
  DataManager private dataManager;
  Authentication private authentication;
  NodeVoting private nodeVoting;

  uint256 public defaultWeight;

  // Constructor
  constructor(
    address _dataManagerAddr,
    address _authenticationAddr,
    address _dataVerificationAddr
  ) {
    dataManager = DataManager(_dataManagerAddr);
    authentication = Authentication(_authenticationAddr);
    nodeVoting = NodeVoting(_dataVerificationAddr);
    defaultWeight = 0;
  }

  // Functions
  function getAnswererCount(uint256 _questionId) public view returns (uint256) {
    return dataManager.getNumericAnswers(_questionId).length;
  }

  function answerQuestion(
    uint256 _questionId,
    uint256 _answer,
    address _answerer
  ) external {
    require(dataManager.getQuestionIsOpen(_questionId), 'Question is not open');
    dataManager.setNumericAnswer(_questionId, _answerer, _answer);
  }

  function roundDivision(
    uint256 _numerator,
    uint256 _denominator
  ) public pure returns (uint256) {
    require(_denominator != 0, 'Denominator cannot be zero');
    uint256 _multipliedNumerator = _numerator * 10;
    uint256 _quotient = _multipliedNumerator / _denominator;
    uint256 _remainderOfQuotient = _quotient % 10;
    if (_remainderOfQuotient < 5) {
      return _quotient / 10;
    } else {
      return _quotient / 10 + 1;
    }
  }

  function sqrt(uint256 _x) public pure returns (uint256) {
    if (_x == 0) return 0;
    uint256 _z = roundDivision((_x + 1), 2);
    uint256 _y = _x;
    while (_z < _y) {
      _y = _z;
      _z = roundDivision((roundDivision(_x, _z) + _z), 2);
    }
    return _y;
  }

  function calculateMeanAnswer(
    uint256 _questionId
  ) public view returns (uint256) {
    uint256 _totalAnswer = 0;
    uint256[] memory _answers = dataManager.getNumericAnswers(_questionId);
    for (uint256 i = 0; i < _answers.length; i++) {
      _totalAnswer += _answers[i];
    }
    require(_answers.length > 0, 'No answers to calculate mean');
    return roundDivision(_totalAnswer, _answers.length);
  }

  function calculateSumOfSquaredDifferences(
    uint256 _questionId
  ) public view returns (uint256) {
    uint256 _meanAnswer = calculateMeanAnswer(_questionId);
    uint256 _sumOfSquaredDifferences = 0;
    uint256[] memory _answers = dataManager.getNumericAnswers(_questionId);
    for (uint256 i = 0; i < _answers.length; i++) {
      uint256 _difference = _answers[i] > _meanAnswer
        ? _answers[i] - _meanAnswer
        : _meanAnswer - _answers[i];
      _sumOfSquaredDifferences += _difference * _difference;
    }
    return _sumOfSquaredDifferences;
  }

  function calculateMeanSquaredDifference(
    uint256 _questionId
  ) public view returns (uint256) {
    uint256 _sumOfSquaredDifferences = calculateSumOfSquaredDifferences(
      _questionId
    );
    uint256 _answerCount = getAnswererCount(_questionId);
    return roundDivision(_sumOfSquaredDifferences, _answerCount);
  }

  function calculateStandardDeviation(
    uint256 _questionId
  ) public view returns (uint256) {
    uint256 _meanSquaredDifference = calculateMeanSquaredDifference(
      _questionId
    );
    return sqrt(_meanSquaredDifference);
  }

  function calculateOutliers(uint256 _questionId) public {
    address[] memory _answerers = dataManager.getAnswerers(_questionId);
    require(_answerers.length >= 3, 'Not enough answers to remove outliers');

    uint256 _meanAnswer = calculateMeanAnswer(_questionId);
    uint256 _standardDeviation = calculateStandardDeviation(_questionId);

    uint256 _outlierUpThreshold = _meanAnswer + _standardDeviation;
    uint256 _outlierDownThreshold = _meanAnswer - _standardDeviation;

    for (uint256 i = 0; i < _answerers.length; i++) {
      address _answerer = _answerers[i];
      uint256 _answer = dataManager.getNumericAnswerByAnswerer(
        _questionId,
        _answerer
      );
      if (_answer > _outlierUpThreshold || _answer < _outlierDownThreshold) {
        dataManager.setNumericAnswerIsOutlier(_questionId, _answerer, true);
      }
    }
  }

  function calculateWeightedAnswer(
    uint256 _answer,
    uint256 _reputation,
    bool _isOutlier
  ) private view returns (uint256, uint256) {
    uint256 _weightedAnswer = defaultWeight;
    uint256 _weighted = defaultWeight;
    DataManager.ReputationRange[] memory reputationRanges = dataManager
      .getReputationRanges();
    for (uint256 i = 0; i < reputationRanges.length; i++) {
      DataManager.ReputationRange memory _range = reputationRanges[i];
      // reputation in range
      if (_reputation >= _range.min && _reputation <= _range.max) {
        _weighted = _isOutlier ? 0 : _range.weight;
        _weightedAnswer = _answer * _weighted;
        break;
      }
    }
    return (_weightedAnswer, _weighted);
  }

  function calculateWeightedAverage(
    uint256 _questionId
  ) private returns (uint256) {
    address[] memory _answerers = dataManager.getAnswerers(_questionId);
    uint256 _totalWeightedAnswer = 0;
    uint256 _totalWeighted = 0;

    for (uint256 i = 0; i < _answerers.length; i++) {
      uint256 _answer = dataManager.getNumericAnswerByAnswerer(
        _questionId,
        _answerers[i]
      );
      uint256 _reputation = authentication.getReputationScoresByAddress(
        _answerers[i]
      );
      bool _isOutlier = dataManager.getNumericAnswerIsOutlier(
        _questionId,
        _answerers[i]
      );
      (uint256 _weightedAnswer, uint256 _weighted) = calculateWeightedAnswer(
        _answer,
        _reputation,
        _isOutlier
      );
      _totalWeightedAnswer += _weightedAnswer;
      _totalWeighted += _weighted;
    }
    if (_totalWeighted == 0) {
      // no answer
      emit AnswerCalculated(_questionId, 0);
      return 0;
    }
    emit AnswerCalculated(
      _questionId,
      roundDivision(_totalWeightedAnswer, _totalWeighted)
    );
    return roundDivision(_totalWeightedAnswer, _totalWeighted);
  }

  function dataIntegration(
    uint256 _questionId,
    address _callBackAddress
  ) external {
    calculateOutliers(_questionId);
    uint256 _finalAnswer = calculateWeightedAverage(_questionId);
    nodeVoting.createNumericVoteEvent(
      _questionId,
      _callBackAddress,
      _finalAnswer
    );
  }
}
