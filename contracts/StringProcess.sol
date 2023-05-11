// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract StringProcess {
    event NewStringQuestion(uint256 indexed questionId, string question, address contractAddr);

    struct Question {
        uint256 questionId;
        string question;
        mapping(address => string) answers;
        address[] answerers;
        bool isExists;
    }

    mapping(uint256 => Question) public questions;

    bytes public stringIntegrationContractABI;
    address public stringIntegrationContractAddr;

    constructor(string memory _abi, address _addr) {
        stringIntegrationContractABI = _abi;
        stringIntegrationContractAddr = _addr;
    }

    function createEvent(uint256 _questionId, string memory _question) public {
        require(!questions[_questionId].isExists, "Question already exists");
        questions[_questionId] = Question(_questionId, _question, new address[](0), true);
        emit NewStringQuestion(_questionId, _question, address(this));
    }

    function answerQuestion(uint256 _questionId, string memory _answer) public {
        require(questions[_questionId].isExists, "Question does not exist");
        questions[_questionId].answers[msg.sender] = _answer;
        bool _alreadyAnswered = false;
        for (uint256 i = 0; i < questions[_questionId].answerers.length; i++) {
            if (questions[_questionId].answerers[i] == msg.sender) {
                _alreadyAnswered = true;
                break;
            }
        }
        if (!_alreadyAnswered) {
            questions[questionId].answerers.push(msg.sender);
        }
    }

    function getAnswerByAnswerer(uint256 questionId, address answerer) public view returns (string memory) {
        return questions[questionId].answers[answerer];
    }

    function getAllAnswerers(uint256 questionId) public view returns (address[] memory) {
        return questions[questionId].answerers;
    }

     function callStringIntegrationContract() public {
        (bool success, bytes memory result) = stringIntegrationContractAddr.call(stringIntegrationContractABI);
        require(success, "String integration function call failed");
    }
}