// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DataManager {
  // Constructor
  constructor() {
    reputationRanges.push(ReputationRange(0, 60, 1));
    reputationRanges.push(ReputationRange(61, 85, 2));
    reputationRanges.push(ReputationRange(86, 100, 3));
  }

  // Enums
  enum DataType {
    Numeric,
    String
  }

  enum VoteType {
    NotStart,
    InProgress,
    Finished
  }

  enum VoteValue {
    Agree,
    Disagree
  }

  // Structs
  struct Response {
    uint256 statusCode;
    string message;
    string description;
    uint256 requestIndex;
  }

  struct Question {
    uint256 questionId;
    string question;
    bool isOpen;
    DataType dataType;
  }

  struct NumericAnswer {
    uint256 value;
    uint256 timestamp;
    bool isOutlier;
  }

  struct StringAnswer {
    string value;
    uint256 timestamp;
  }

  struct ReputationRange {
    uint256 min;
    uint256 max;
    uint256 weight;
  }

  struct Vote {
    bool hasVoted;
    VoteValue value;
    uint256 timestamp;
  }

  // Variables
  Response[] public responses;

  address[] public users;

  mapping(uint256 => Question) public questions;
  uint256[] private questionIds;
  uint256[] private numericQuestionIds;
  uint256[] private stringQuestionIds;

  mapping(uint256 => mapping(address => NumericAnswer)) private numericAnswers;
  mapping(uint256 => mapping(address => StringAnswer)) private stringAnswers;
  mapping(uint256 => address[]) private questionAnswerers;
  mapping(uint256 => uint256) public finalNumericAnswers;
  mapping(uint256 => string) public finalStringAnswers;
  ReputationRange[] public reputationRanges;

  mapping(uint256 => VoteType) private voteEvents;
  mapping(uint256 => mapping(address => Vote)) private votes;
  mapping(uint256 => address[]) private questionVoters;

  // Getters
  function getResponses() external view returns (Response[] memory) {
    return responses;
  }

  function getUsers() external view returns (address[] memory) {
    return users;
  }

  function getNumericQuestions() external view returns (Question[] memory) {
    Question[] memory _questions = new Question[](numericQuestionIds.length);
    for (uint256 i = 0; i < numericQuestionIds.length; i++) {
      _questions[i] = questions[numericQuestionIds[i]];
    }
    return _questions;
  }

  function getStringQuestions() external view returns (Question[] memory) {
    Question[] memory _questions = new Question[](stringQuestionIds.length);
    for (uint256 i = 0; i < stringQuestionIds.length; i++) {
      _questions[i] = questions[stringQuestionIds[i]];
    }
    return _questions;
  }

  function getQuestionIsOpen(uint256 _questionId) external view returns (bool) {
    return questions[_questionId].isOpen;
  }

  function getAnswerers(
    uint256 questionId
  ) public view returns (address[] memory) {
    return questionAnswerers[questionId];
  }

  function getNumericAnswers(
    uint256 _questionId
  ) external view returns (uint256[] memory) {
    address[] memory _answerers = getAnswerers(_questionId);
    uint256[] memory _answers = new uint256[](_answerers.length);
    for (uint256 i = 0; i < _answerers.length; i++) {
      _answers[i] = numericAnswers[_questionId][_answerers[i]].value;
    }
    return _answers;
  }

  function getStringAnswers(
    uint256 _questionId
  ) external view returns (string[] memory) {
    address[] memory _answerers = getAnswerers(_questionId);
    string[] memory _answers = new string[](_answerers.length);
    for (uint256 i = 0; i < _answerers.length; i++) {
      _answers[i] = stringAnswers[_questionId][_answerers[i]].value;
    }
    return _answers;
  }

  function getNumericAnswerByAnswerer(
    uint256 _questionId,
    address _answerer
  ) external view returns (uint256) {
    return numericAnswers[_questionId][_answerer].value;
  }

  function getStringAnswerByAnswerer(
    uint256 _questionId,
    address _answerer
  ) external view returns (string memory) {
    return stringAnswers[_questionId][_answerer].value;
  }

  function getAnswerTimestampByAnswerer(
    uint256 _questionId,
    address _answerer
  ) external view returns (uint256) {
    if (questions[_questionId].dataType == DataType.Numeric) {
      return numericAnswers[_questionId][_answerer].timestamp;
    } else {
      return stringAnswers[_questionId][_answerer].timestamp;
    }
  }

  function getNumericAnswerIsOutlier(
    uint256 _questionId,
    address _answerer
  ) external view returns (bool) {
    return numericAnswers[_questionId][_answerer].isOutlier;
  }

  function getFinalNumericAnswer(
    uint256 _questionId
  ) external view returns (uint256) {
    return finalNumericAnswers[_questionId];
  }

  function getFinalStringAnswer(
    uint256 _questionId
  ) external view returns (string memory) {
    return finalStringAnswers[_questionId];
  }

  function getReputationRanges()
    external
    view
    returns (ReputationRange[] memory)
  {
    return reputationRanges;
  }

  function getVoteEvent(uint256 _questionId) external view returns (VoteType) {
    return voteEvents[_questionId];
  }

  function getVoteByVoter(
    uint256 _questionId,
    address _voter
  ) external view returns (Vote memory) {
    return votes[_questionId][_voter];
  }

  function getVoters(
    uint256 _questionId
  ) external view returns (address[] memory) {
    return questionVoters[_questionId];
  }

  // Setters
  function setResponse(Response memory _response) external {
    responses.push(_response);
  }

  function setUser(address _user) external {
    users.push(_user);
  }

  function setQuestion(
    uint256 _questionId,
    string memory _question,
    bool _isOpen,
    DataType _dataType
  ) external {
    questions[_questionId] = Question(
      _questionId,
      _question,
      _isOpen,
      _dataType
    );
    questionIds.push(_questionId);
    setVoteEvent(_questionId, VoteType.NotStart);
    if (_dataType == DataType.Numeric) {
      numericQuestionIds.push(_questionId);
    } else {
      stringQuestionIds.push(_questionId);
    }
  }

  function setQuestionIsOpen(uint256 _questionId, bool _isOpen) external {
    questions[_questionId].isOpen = _isOpen;
  }

  function setNumericAnswer(
    uint256 _questionId,
    address _answerer,
    uint256 _answer
  ) external {
    if (numericAnswers[_questionId][_answerer].timestamp == 0) {
      // user has not answered this question yet
      createNumericAnswer(_questionId, _answerer, _answer);
    } else {
      // user has answered this question before
      updateNumericAnswer(_questionId, _answerer, _answer);
    }
  }

  function setStringAnswer(
    uint256 _questionId,
    address _answerer,
    string memory _answer
  ) external {
    if (stringAnswers[_questionId][_answerer].timestamp == 0) {
      // user has not answered this question yet
      createStringAnswer(_questionId, _answerer, _answer);
    } else {
      // user has answered this question before
      updateStringAnswer(_questionId, _answerer, _answer);
    }
  }

  function updateNumericAnswer(
    uint256 _questionId,
    address _answerer,
    uint256 _answer
  ) private {
    numericAnswers[_questionId][_answerer].value = _answer;
    numericAnswers[_questionId][_answerer].timestamp = block.timestamp;
  }

  function updateStringAnswer(
    uint256 _questionId,
    address _answerer,
    string memory _answer
  ) private {
    stringAnswers[_questionId][_answerer].value = _answer;
    stringAnswers[_questionId][_answerer].timestamp = block.timestamp;
  }

  function createNumericAnswer(
    uint256 _questionId,
    address _answerer,
    uint256 _answer
  ) private {
    numericAnswers[_questionId][_answerer] = NumericAnswer(
      _answer,
      block.timestamp,
      false
    );
    questionAnswerers[_questionId].push(_answerer);
  }

  function createStringAnswer(
    uint256 _questionId,
    address _answerer,
    string memory _answer
  ) private {
    stringAnswers[_questionId][_answerer] = StringAnswer(
      _answer,
      block.timestamp
    );
    questionAnswerers[_questionId].push(_answerer);
  }

  function setNumericAnswerIsOutlier(
    uint256 _questionId,
    address _answerer,
    bool _isOutlier
  ) external {
    numericAnswers[_questionId][_answerer].isOutlier = _isOutlier;
  }

  function setFinalNumericAnswer(
    uint256 _questionId,
    uint256 _answer
  ) external {
    finalNumericAnswers[_questionId] = _answer;
  }

  function setFinalStringAnswer(
    uint256 _questionId,
    string memory _answer
  ) external {
    finalStringAnswers[_questionId] = _answer;
  }

  function setVoteEvent(uint256 _questionId, VoteType _voteType) public {
    voteEvents[_questionId] = _voteType;
  }

  function setVote(
    uint256 _questionId,
    address _voter,
    VoteValue _voteValue
  ) external returns (bool) {
    if (!votes[_questionId][_voter].hasVoted) {
      votes[_questionId][_voter] = Vote(true, _voteValue, block.timestamp);
      questionVoters[_questionId].push(_voter);
      return true;
    } else {
      return false;
    }
  }
}
