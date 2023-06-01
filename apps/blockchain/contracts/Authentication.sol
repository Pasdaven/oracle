// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Authentication {

    Address[] public users;

    function register(address _walletAddress) external view returns () {
        bool _alreadyRegistered = false;
        for(int i = 0; i < users.length; i++) {
            if (users[i] == _walletAddress) {
                _alreadyRegistered = true;
            }
        }

        if (!_alreadyRegistered) {
            users.push(_walletAddress);
        }
    }
}