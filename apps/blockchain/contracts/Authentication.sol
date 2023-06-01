// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Authentication {

    address[] public users;

    function register(address _walletAddress) external {
        bool _alreadyRegistered = false;
        for(uint256 i = 0; i < users.length; i++) {
            if (users[i] == _walletAddress) {
                _alreadyRegistered = true;
            }
        }

        if (!_alreadyRegistered) {
            users.push(_walletAddress);
        }
    }

    function getUsers() external view returns (address[] memory) {
        return users;
    }

    function verifyUser(address _walletAddress) external view returns (bool) {
        address[] memory users = authentication.getUsers();
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == _walletAddress) {
                return true;
            }
        }
        return false;
    }
}