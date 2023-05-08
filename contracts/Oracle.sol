// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Numeric.sol";
import "./String.sol";

contract Oracle {
    struct Data {
        string dataType;
        string content;
    }

    struct Response {
        string status;
        string message;
    }

    Response[] public responses;

    function processRequest(Data memory requestData) public {
        Response memory dataTypeCheck = checkDataType(requestData);
        Response memory response;
        if (keccak256(bytes(dataTypeCheck.status)) == keccak256(bytes("invalid"))) {
            response = dataTypeCheck;
        }

        if (keccak256(bytes(requestData.dataType)) == keccak256(bytes("Numeric"))) {
            Numeric numericContract = new Numeric();
            response = numericContract.numericFunction(requestData.content);
        } else if (keccak256(bytes(requestData.dataType)) == keccak256(bytes("String"))) {
            String stringContract = new String();
            response = stringContract.stringFunction(requestData.content);
        }
        responses.push(response);
    }

    function checkDataType(Data memory _data) public pure returns (Response memory) {
        bytes memory numericType = bytes("Numeric");
        bytes memory stringType = bytes("String");

        bytes memory dataTypeBytes = bytes(_data.dataType);

        if (keccak256(dataTypeBytes) != keccak256(numericType) && keccak256(dataTypeBytes) != keccak256(stringType)) {
            return Response("invalid", "Invalid data type");
        }

        return Response("valid", "Valid data type");
    }

    function getResponses() public view returns (Response memory) {
        uint256 length = responses.length;
        return responses[length - 1];
    }
}
