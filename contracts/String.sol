// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Oracle.sol";

contract String {
    function stringFunction(string memory stringData) public returns (Oracle.Response memory) {
        // do something with string data
        Oracle.Response memory response = Oracle.Response("success", "String function executed successfully");
        return response;
    }
}