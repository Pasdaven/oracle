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

    constructor(bytes memory _abi, address _addr) {
        stringIntegrationContractABI = _abi;
        stringIntegrationContractAddr = _addr;
    }

    function createEvent(uint256 _questionId, string memory _question) public {
        require(!questions[_questionId].isExists, "Question already exists");
        
        Question storage question = questions[_questionId];
        question.questionId = _questionId;
        question.question = _question;
        question.isExists = true;

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
            questions[_questionId].answerers.push(msg.sender);
        }
    }

    function getAnswerByAnswerer(uint256 _questionId, address answerer) public view returns (string memory) {
        return questions[_questionId].answers[answerer];
    }

    function getAllAnswerers(uint256 _questionId) public view returns (address[] memory) {
        return questions[_questionId].answerers;
    }

    function callStringIntegrationContract() public {
        // bytes memory data = abi.encodePacked(stringIntegrationContractABI);
        (bool success, bytes memory result) = stringIntegrationContractAddr.call(stringIntegrationContractABI);
        require(success, "String integration function call failed");
    }
}