// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './NodeVoting.sol';

contract StringFiltering {
  // Variables
  DataManager private dataManager;
  NodeVoting private nodeVoting;

  // Constructor
  constructor(address _dataManagerAddr, address _nodeVotingAddr) {
    dataManager = DataManager(_dataManagerAddr);
    nodeVoting = NodeVoting(_nodeVotingAddr);
  }

  // Functions
  function answerQuestion(
    uint256 _questionId,
    string memory _answer,
    address _answerer
  ) external {
    require(dataManager.getQuestionIsOpen(_questionId), 'Question is not open');
    dataManager.setStringAnswer(_questionId, _answerer, _answer);
  }

  function getRandomAnswers(
    uint256 _questionId,
    uint256 _count
  ) public view returns (string[] memory) {
    string[] memory _answers = dataManager.getStringAnswers(_questionId);
    _count = _count > _answers.length ? _answers.length : _count;

    string[] memory _selectedAnswers = new string[](_count);
    // store the indices of the selected answers
    uint256[] memory _selectedIndices = new uint256[](_count);
    uint256 _totalAnswers = _answers.length;

    for (uint256 i = 0; i < _count; i++) {
      uint256 _randomIndex = uint256(
        keccak256(abi.encodePacked(block.timestamp, msg.sender, i))
      ) % _totalAnswers;
      // ensure the selected index is unique
      for (uint256 j = 0; j < i; j++) {
        require(
          _selectedIndices[j] != _randomIndex,
          'Duplicate selected index'
        );
      }
      _selectedIndices[i] = _randomIndex;
      _selectedAnswers[i] = _answers[_randomIndex];
    }
    return _selectedAnswers;
  }

  function dataFiltering(
    uint256 _questionId,
    address _callBackAddress
  ) external {
    string[] memory _answers = getRandomAnswers(_questionId, 10);
    nodeVoting.createVoteEvent(_questionId, _callBackAddress, _answers);
  }
}
