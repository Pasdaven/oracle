// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './Authentication.sol';
import './DataVerification.sol';
import './NodeVoting.sol';
import './NumericIntegration.sol';
import './StringFiltering.sol';
import './NumericProcess.sol';
import './StringProcess.sol';

contract Controller {
  // Variables
  DataManager private dataManager;
  Authentication private authentication;
  DataVerification private dataVerification;
  NodeVoting private nodeVoting;
  NumericIntegration private numericIntegration;
  StringFiltering private stringFiltering;
  NumericProcess private numericProcess;
  StringProcess private stringProcess;

  // Constructor
  constructor(
    address _dataManagerAddr,
    address _authenticationAddr,
    address _dataVerificationAddr,
    address _nodeVotingAddr,
    address _numericIntegrationAddr,
    address _stringFilteringAddr,
    address _numericProcessAddr,
    address _stringProcessAddr
  ) {
    dataManager = DataManager(_dataManagerAddr);
    authentication = Authentication(_authenticationAddr);
    dataVerification = DataVerification(_dataVerificationAddr);
    nodeVoting = NodeVoting(_nodeVotingAddr);
    numericIntegration = NumericIntegration(_numericIntegrationAddr);
    stringFiltering = StringFiltering(_stringFilteringAddr);
    numericProcess = NumericProcess(_numericProcessAddr);
    stringProcess = StringProcess(_stringProcessAddr);
  }

  // Functions
  function getNumericEvent(
    address _walletAddress
  ) external view returns (uint256[] memory, string[] memory) {
    require(
      authentication.verifyUserIsRegistered(_walletAddress),
      'User does not registered'
    );
    return numericProcess.getQuestions();
  }

  function getStringEvent(
    address _walletAddress
  ) external view returns (uint256[] memory, string[] memory) {
    require(
      authentication.verifyUserIsRegistered(_walletAddress),
      'User does not registered'
    );
    return stringProcess.getQuestions();
  }

  function answerNumericQuestion(
    uint256 _questionId,
    uint256 _answer,
    address _walletAddress
  ) external {
    require(
      authentication.verifyUserIsRegistered(_walletAddress),
      'User does not registered'
    );
    numericIntegration.answerQuestion(_questionId, _answer, _walletAddress);
  }

  function answerStringQuestion(
    uint256 _questionId,
    string memory _answer,
    address _walletAddress
  ) external {
    // stringFiltering.answerQuestion(_questionId, _answer, _walletAddress);
  }

  function auth(address _walletAddress) external {
    authentication.register(_walletAddress);
  }

  function getReputationScores(
    address _walletAddress
  ) external view returns (uint256) {
    return authentication.getReputationScoresByAddress(_walletAddress);
  }
}
