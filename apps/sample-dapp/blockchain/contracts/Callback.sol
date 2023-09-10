// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract Callback {
    function receiveAnswer(string memory res) public pure {
        console.log('Received from oracle: %s', res);
    }
}
