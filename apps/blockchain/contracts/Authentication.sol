// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';

contract Authentication {

  // Variables
  DataManager private dataManager;
  mapping(address => uint256) public reputationScores;

  // Constructor
  constructor(address _dataManagerAddr) {
    dataManager = DataManager(_dataManagerAddr);
  }

  // Functions
  function getReputationScoresByAddress(
    address _walletAddress
  ) external view returns (uint256) {
    return reputationScores[_walletAddress];
  }

  function register(address _walletAddress) public {
    if (!verifyUserIsRegistered(_walletAddress)) {
      reputationScores[_walletAddress] = 100;
      dataManager.setUser(_walletAddress);
      // call stake
    }
  }

  function verifyUserIsRegistered(
    address _walletAddress
  ) public view returns (bool) {
    address[] memory _users = dataManager.getUsers();
    for (uint256 i = 0; i < _users.length; i++) {
      if (_users[i] == _walletAddress) {
        return true;
      }
    }
    return false;
  }

  function adjustCredibilityScore(
    address _walletAddress,
    int256 _scoreChange
  ) public {
    require(verifyUserIsRegistered(_walletAddress), 'User does not registered');
    uint256 absScoreChange = uint256(
      _scoreChange > 0 ? _scoreChange : -_scoreChange
    );
    if (_scoreChange > 0) {
      reputationScores[_walletAddress] = reputationScores[_walletAddress] +
        absScoreChange >
        100
        ? 100
        : reputationScores[_walletAddress] + absScoreChange;
    } else {
      reputationScores[_walletAddress] = reputationScores[_walletAddress] >=
        absScoreChange
        ? reputationScores[_walletAddress] - absScoreChange
        : 0;
    }
  }
}
