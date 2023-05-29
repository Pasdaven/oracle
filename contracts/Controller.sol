// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./NumericProcess.sol";
import "./StringProcess.sol";

contract Controller {
    // auth 錢包地址
    // get event 錢包地址
    //answer question 錢包地址 問題ＩＤ 答案內容
    NumericProcess public numericContract;
    StringProcess public stringContract;

    constructor(address addressOfnumericContract, address addressOfstringContract) {
        numericContract = NumericProcess(addressOfnumericContract);
        stringContract = StringProcess(addressOfstringContract);
    }

     function sendRequestToAuth(address walletAddress) external returns (string memory) {

     }
     function sendRequestToGetEvent(address walletAddress) external returns (string memory) {
        
     }
     function sendRequestToAnswerNumericQuestion(address walletAddress, uint256 questionId, uint256 answerContent) external returns (string memory) {
        try numericContract.answerQuestion(questionId, answerContent) {
            return "success";
        } catch {
            return "invalid";
        }
     }
     function sendRequestToAnswerStringQuestion(address walletAddress, uint256 questionId, string memory answerContent) external returns (string memory) {
        try stringContract.answerQuestion(questionId, answerContent) {
            return "success";
        } catch {
            return "invalid";
        }
     }
}