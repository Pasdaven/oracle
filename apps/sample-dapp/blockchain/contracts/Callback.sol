// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "truffle/console.sol";

contract Callback {
    constructor() {}

    // for oracle calling
    event receiveEvent(string answer);

    function receiveAnswer(string memory res) public {
        console.log("receiveAnswer: %s", res);
        emit receiveEvent(res);
    }
}
