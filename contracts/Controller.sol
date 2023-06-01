// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface NumericProcess {
    function answerQuestion(uint256 questionId, uint256 answerContent, address walletAddress) external returns (string memory);
}

interface StringProcess {
    function answerQuestion(uint256 questionId, string memory answerContent, address walletAddress) external returns (string memory);
}

interface Authentication {
    function register(address _walletAddress) external;
}

contract Controller {
    // auth 錢包地址
    // get event 錢包地址
    //answer question 錢包地址 問題ＩＤ 答案內容
    NumericProcess public numericContract;
    StringProcess public stringContract;
    Authentication public authContract;

    constructor(address addressOfnumericContract, address addressOfstringContract, address addressOfauthContract) {
        numericContract = NumericProcess(addressOfnumericContract);
        stringContract = StringProcess(addressOfstringContract);
        authContract = Authentication(addressOfauthContract);
    }

     function sendRequestToAuth(address walletAddress) external returns (string memory) {
        try authContract.register(walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }
     function sendRequestToGetEvent(address walletAddress) external returns (string memory) {
        
     }
     function sendRequestToAnswerNumericQuestion(uint256 questionId, uint256 answerContent, address walletAddress) external returns (string memory) {
        try numericContract.answerQuestion(questionId, answerContent, walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }
     function sendRequestToAnswerStringQuestion(uint256 questionId, string memory answerContent, address walletAddress) external returns (string memory) {
        try stringContract.answerQuestion(questionId, answerContent, walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }
}