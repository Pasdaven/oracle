// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./NumericProcess.sol";
import "./StringProcess.sol";
import "./Authentication.sol";
import "./ProvideEvent.sol";

contract Controller {
    NumericProcess public numericContract;
    StringProcess public stringContract;
    Authentication public authContract;
    ProvideEvent public provideEventContract;

    constructor(address addressOfnumericContract, address addressOfstringContract, address addressOfauthContract, address addressOfprovideEventContract) {
        numericContract = NumericProcess(addressOfnumericContract);
        stringContract = StringProcess(addressOfstringContract);
        authContract = Authentication(addressOfauthContract);
        provideEventContract = ProvideEvent(addressOfprovideEventContract);
    }

     function auth(address walletAddress) external returns (string memory) {
        try authContract.register(walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function getNumericEvent(address walletAddress) external view returns (string memory) {
        try provideEventContract.getNumericQuestions(walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function getStringEvent(address walletAddress) external view returns (string memory) {
        try provideEventContract.getStringQuestions(walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function answerNumericQuestion(uint256 questionId, uint256 answerContent, address walletAddress) external returns (string memory) {
        try numericContract.answerQuestion(questionId, answerContent, walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function answerStringQuestion(uint256 questionId, string memory answerContent, address walletAddress) external returns (string memory) {
        try stringContract.answerQuestion(questionId, answerContent, walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

}