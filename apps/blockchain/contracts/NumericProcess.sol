// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./NumericIntegration.sol";
import "./Authentication.sol";

contract NumericProcess {

    // Events
    event NewNumericQuestion(uint256 indexed questionId, string question, address contractAddr);

    // Structs
    struct Question {
        uint256 questionId;
        string question;
        mapping(address => uint256) answers;
        address[] answerers;
        bool isExists;
    }

    // Variables
    mapping(uint256 => Question) private questions;
    uint256[] private questionIds;
    Authentication private authentication;
    NumericIntegration private numericIntegration;

    // Constructor
    constructor(address _authenticationAddr, address _numericIntegrationAddr) {
        authentication = Authentication(_authenticationAddr);
        numericIntegration = NumericIntegration(_numericIntegrationAddr);
    }

    // Getters
    function getQuestions(address _walletAddress) external view returns (uint256[] memory, string[] memory) {
        require(authentication.verifyUserIsRegistered(_walletAddress), "User does not registered");
        uint256[] memory _questionIds = new uint256[](questionIds.length);
        string[] memory _questions = new string[](questionIds.length);
        for (uint256 i = 0; i < questionIds.length; i++) {
            if (!questions[questionIds[i]].isExists) continue;
            _questionIds[i] = questions[questionIds[i]].questionId;
            _questions[i] = questions[questionIds[i]].question;
        }
        return (_questionIds, _questions);
    }

    function getAnswerByAnswerer(uint256 _questionId, address answerer) external view returns (uint256) {
        return questions[_questionId].answers[answerer];
    }

    function getAnswerers(uint256 _questionId) external view returns (address[] memory) {
        return questions[_questionId].answerers;
    }

    // Setters
    function setQuestions(uint256 _questionId, string memory _question) private {
        Question storage question = questions[_questionId];
        question.questionId = _questionId;
        question.question = _question;
        question.isExists = true;
    }

    // Functions
    function createEvent(uint256 _questionId, string memory _question, address _callBackAddress) external {
        require(!questions[_questionId].isExists, "Question already exists");
        questionIds.push(_questionId);
        setQuestions(_questionId, _question);
        emit NewNumericQuestion(_questionId, _question, address(this));

        numericIntegration.dataIntergration(_questionId, _callBackAddress);
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
}
