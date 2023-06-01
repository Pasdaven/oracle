// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface StringIntegration {

}
interface Authentication {
    function register() external;
    function getUsers() external view returns (address[] memory);
    function verifyUser(address _walletAddress) external view returns (bool);
}

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

    StringIntegration private stringIntegration;
    Authentication private authentication;

    constructor(address _stringIntegrationAddr, address _authenticationAddr) {
        stringIntegration = StringIntegration(_stringIntegrationAddr);
        authentication = Authentication(_authenticationAddr);
    }

    function createEvent(uint256 _questionId, string memory _question) external {
        require(!questions[_questionId].isExists, "Question already exists");
        
        Question storage question = questions[_questionId];
        question.questionId = _questionId;
        question.question = _question;
        question.isExists = true;

        emit NewStringQuestion(_questionId, _question, address(this));
    }

    function answerQuestion(uint256 _questionId, string memory _answer, address _walletAddress) external {
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

    function getAnswerByAnswerer(uint256 _questionId, address answerer) external view returns (string memory) {
        return questions[_questionId].answers[answerer];
    }

    function getAllAnswerers(uint256 _questionId) external view returns (address[] memory) {
        return questions[_questionId].answerers;
    }

    function callStringIntegrationContract() external view {
        // uint256 result = stringIntegration.test();
    }
}