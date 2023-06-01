// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface NumericProcess {
    struct Question {
        uint256 questionId;
        string question;
        mapping(address => uint256) answers;
        address[] answerers;
        bool isExists;
    }
    function createEvent(uint256 _questionId, string memory _question) external;
    function answerQuestion(uint256 _questionId, uint256 _answer, address _walletAddress) external;
    function getAnswerByAnswerer(uint256 _questionId, address answerer) external view returns (uint256);
    function getAllAnswerers(uint256 _questionId) external view returns (address[] memory);
    function callNumericIntegrationContract() external view;
    function getAllQuestions() external view returns (mapping(uint256 => Question) memory);
}
interface StringProcess {
    struct Question {
        uint256 questionId;
        string question;
        mapping(address => string) answers;
        address[] answerers;
        bool isExists;
    }
    function createEvent(uint256 _questionId, string memory _question) external;
    function answerQuestion(uint256 _questionId, string memory _answer, address _walletAddress) external;
    function getAnswerByAnswerer(uint256 _questionId, address answerer) external view returns (string memory);
    function getAllAnswerers(uint256 _questionId) external view returns (address[] memory);
    function callStringIntegrationContract() external view;
    function getAllQuestions() external view returns (mapping(uint256 => Question) memory);
}

contract ProvideEvent {

    // function 

}