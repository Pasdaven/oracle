// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract App {
    constructor() {}

    function getData() public pure returns (string memory res) {
        return "Hello World!";
    }
}
