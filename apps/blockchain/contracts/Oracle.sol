// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './DataManager.sol';
import './NumericProcess.sol';
import './StringProcess.sol';

contract Oracle {
  // Structs
  struct Data {
    string dataType;
    string question;
    address callBackAddress;
  }

  // Variables
  mapping(uint256 => address) public requestIndexToAddress;
  uint256 public requestIndexLength;
  DataManager private dataManager;
  NumericProcess private numericProcess;
  StringProcess private stringProcess;

  // Constructor
  constructor(
    address _dataManagerAddr,
    address _numericProcessAddr,
    address _stringProcessAddr
  ) {
    dataManager = DataManager(_dataManagerAddr);
    numericProcess = NumericProcess(_numericProcessAddr);
    stringProcess = StringProcess(_stringProcessAddr);
    requestIndexLength = 0;
  }

  // Functions
  function processRequest(Data memory _requestData) public {
    requestIndexToAddress[requestIndexLength] = _requestData.callBackAddress;

    DataManager.Response memory dataTypeCheck = checkDataType(_requestData);
    DataManager.Response memory response;

    if (dataTypeCheck.statusCode == 602) {
      response = DataManager.Response(
        505,
        'QUESTION_CREATED_FAILURE',
        'Question created failure, Data type invalid',
        requestIndexLength
      );
    } else {
      if (compareStrings(_requestData.dataType, 'Numeric')) {
        numericProcess.createQuestionEvent(
          requestIndexLength,
          _requestData.question,
          _requestData.callBackAddress
        );
      } else if (compareStrings(_requestData.dataType, 'String')) {
        stringProcess.createQuestionEvent(
          requestIndexLength,
          _requestData.question,
          _requestData.callBackAddress
        );
      }
      response = DataManager.Response(
        504,
        'QUESTION_CREATED_SUCCESS',
        'Question created successfully',
        requestIndexLength
      );
    }

    dataManager.setResponse(response);
    requestIndexLength++;
  }

  function checkDataType(
    Data memory _data
  ) internal pure returns (DataManager.Response memory) {
    if (
      compareStrings(_data.dataType, 'Numeric') ||
      compareStrings(_data.dataType, 'String')
    ) {
      return DataManager.Response(601, 'VALID_DATA_TYPE', 'Valid data type', 0);
    }
    return
      DataManager.Response(602, 'INVALID_DATA_TYPE', 'Invalid data type', 0);
  }

  function compareStrings(
    string memory _a,
    string memory _b
  ) internal pure returns (bool) {
    return keccak256(bytes(_a)) == keccak256(bytes(_b));
  }

  function getLastResponse() public view returns (DataManager.Response memory) {
    DataManager.Response[] memory responses = dataManager.getResponses();
    uint256 length = responses.length;
    return responses[length - 1];
  }

  function getCallbackAddressByIndex(
    uint256 _index
  ) public view returns (address) {
    return requestIndexToAddress[_index];
  }
}
