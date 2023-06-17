// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./NumericIntegration.sol";
import "./Authentication.sol";

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

    NumericIntegration private numericIntegration;
    Authentication private authentication;
    
    constructor(address _numericIntegrationAddr, address _authenticationAddr) {
        numericIntegration = NumericIntegration(_numericIntegrationAddr);
        authentication = Authentication(_authenticationAddr);
    }

    function createEvent(uint256 _questionId, string memory _question) external {
        require(!questions[_questionId].isExists, "Question already exists");

        Question storage question = questions[_questionId];
        question.questionId = _questionId;
        question.question = _question;
        question.isExists = true;

        emit NewNumericQuestion(_questionId, _question, address(this));
    }

    function answerQuestion(uint256 _questionId, uint256 _answer, address _walletAddress) external {
        require(authentication.verifyUserIsRegistered(_walletAddress), "User does not registered");
        require(questions[_questionId].isExists, "Question does not exist");
        
        questions[_questionId].answers[_walletAddress] = _answer;
        bool _alreadyAnswered = false;
        for (uint256 i = 0; i < questions[_questionId].answerers.length; i++) {
            if (questions[_questionId].answerers[i] == _walletAddress) {
                _alreadyAnswered = true;
                break;
            }
        }
        if (!_alreadyAnswered) {
            questions[_questionId].answerers.push(_walletAddress);
        }
    }

    function getAnswerByAnswerer(uint256 _questionId, address answerer) external view returns (uint256) {
        return questions[_questionId].answers[answerer];
    }

    function getAllAnswerers(uint256 _questionId) external view returns (address[] memory) {
        return questions[_questionId].answerers;
    }

    function callNumericIntegrationContract() external view {
        uint256 result = numericIntegration.test();
        console.log(result);
    }

}
