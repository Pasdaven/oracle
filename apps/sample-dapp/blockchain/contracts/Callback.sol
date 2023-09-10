// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract Callback {
    function receiveAnswer(string memory res) public {
        console.log('receive from oracle: %s', res);
    }
}
