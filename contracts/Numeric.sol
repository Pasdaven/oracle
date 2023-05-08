// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Oracle.sol";

contract Numeric {
    function numericFunction(string memory numericData) public returns (Oracle.Response memory) {
        // do something with numeric data
        Oracle.Response memory response = Oracle.Response("success", "Numeric function executed successfully");
        return response;
    }
}