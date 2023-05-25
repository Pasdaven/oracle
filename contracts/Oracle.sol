// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Oracle {
    struct Data {
        string dataType;
        string question;
        address callBackAddress;
    }

    struct Response {
        string status;
        string message;
        uint256 requestIndex;
    }

    Response[] public responses;
    mapping(uint256 => address) public requestIndexToAddress;
    uint256 public requestIndexLength;

    bytes public numericProcessContractABI;
    address public numericProcessContractAddr;
    bytes public stringProcessContractABI;
    address public stringProcessContractAddr;

    constructor(address _numericProcessAddr, address _stringProcessAddr) {
        numericProcess = NumericProcess(_numericProcessAddr);
        stringProcess = StringProcess(_stringProcessAddr);
    }

    function processRequest(Data memory requestData) public {
        requestIndexToAddress[requestIndexLength] = requestData.callBackAddress;

        Response memory dataTypeCheck = checkDataType(requestData);
        Response memory response;
        if (keccak256(bytes(dataTypeCheck.status)) == keccak256(bytes("invalid"))) {
            response = dataTypeCheck;
            response.requestIndex = requestIndexLength;
        } else {
            if (keccak256(bytes(requestData.dataType)) == keccak256(bytes("Numeric"))) {
                numericProcess.createEvent(requestIndexLength, requestData.question);
            } else if (keccak256(bytes(requestData.dataType)) == keccak256(bytes("String"))) {
                stringProcess.createEvent(requestIndexLength, requestData.question);
            }
            response = Response("valid", "Valid data type", requestIndexLength);
        }
        responses.push(response);

        requestIndexLength++;
    }

    function checkDataType(Data memory _data) public pure returns (Response memory) {
        bytes memory numericType = bytes("Numeric");
        bytes memory stringType = bytes("String");

        bytes memory dataTypeBytes = bytes(_data.dataType);

        if (keccak256(dataTypeBytes) != keccak256(numericType) && keccak256(dataTypeBytes) != keccak256(stringType)) {
            return Response("invalid", "Invalid data type", 0);
        }

        return Response("valid", "Valid data type", 0);
    }

    function getResponses() public view returns (Response memory) {
        uint256 length = responses.length;
        return responses[length - 1];
    }

    function getCallbackAddressByIndex(uint256 _index) public view returns (address) {
        return requestIndexToAddress[_index];
    }
}
