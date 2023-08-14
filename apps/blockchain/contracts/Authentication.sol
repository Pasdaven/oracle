// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Authentication {

    event Register(bool isRegistered);

    address[] public users;

    function register(address _walletAddress) public {
        if (!verifyUserIsRegistered(_walletAddress)) {
            users.push(_walletAddress);
            emit Register(true);
        } else {
            emit Register(false);
        }
    }

    function getUsers() external view returns (address[] memory) {
        return users;
    }

    function verifyUserIsRegistered(address _walletAddress) public view returns (bool) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == _walletAddress) {
                return true;
            }
        }
        return false;
    }
}