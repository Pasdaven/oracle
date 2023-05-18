// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract NumericProcess {
    event NewNumericQuestion(uint256 indexed questionId, string question, address contractAddr);

    struct Question {
        uint256 questionId;
        string question;
        mapping(address => uint256) answers;
        address[] answerers;
        bool isExists;
    }

    mapping(uint256 => Question) public questions;

    bytes public numericIntegrationContractABI;
    address public numericIntegrationContractAddr;

    constructor(bytes memory _abi, address _addr) {
        numericIntegrationContractABI = _abi;
        numericIntegrationContractAddr = _addr;
    }

    function createEvent(uint256 _questionId, string memory _question) public {
        // uint256 _questionId = uint256(keccak256(abi.encodePacked(_question)));
        require(!questions[_questionId].isExists, "Question already exists");

        Question storage question = questions[_questionId];
        question.questionId = _questionId;
        question.question = _question;
        question.isExists = true;

        emit NewNumericQuestion(_questionId, _question, address(this));
    }

    function answerQuestion(uint256 _questionId, uint256 _answer) public {
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

    function getAnswerByAnswerer(uint256 _questionId, address answerer) public view returns (uint256) {
        return questions[_questionId].answers[answerer];
    }

    function getAllAnswerers(uint256 _questionId) public view returns (address[] memory) {
        return questions[_questionId].answerers;
    }

    function callNumericIntegrationContract() public {
        (bool success, bytes memory result) = numericIntegrationContractAddr.call(numericIntegrationContractABI);
        require(success, "Numeric integration function call failed");
    }

}