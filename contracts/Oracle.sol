// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Oracle {
    struct Data {
        string dataType;
        string content;
    }

    struct Response {
        string status;
        string message;
    }

    function checkDataType(Data memory _data) pure external returns (Response memory) {
        bytes memory numericType = bytes("Numeric");
        bytes memory stringType = bytes("String");

        bytes memory dataTypeBytes = bytes(_data.dataType);

        if (keccak256(dataTypeBytes) != keccak256(numericType) && keccak256(dataTypeBytes) != keccak256(stringType)) {
            return Response("invalid", "Invalid data type");
        }

        return Response("valid", "Valid data type");
    }
}
