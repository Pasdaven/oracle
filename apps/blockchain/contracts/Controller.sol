// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./NumericProcess.sol";
import "./StringProcess.sol";
import "./Authentication.sol";
import "./ProvideEvent.sol";

contract Controller {
    Authentication private authentication;
    NumericProcess private numericProcess;
    StringProcess private stringProcess;
    ProvideEvent private provideEvent;

    constructor(address addressOfAuthContract, address addressOfNumericContract, address addressOfStringContract, address addressOfProvideEventContract) {
        authentication = Authentication(addressOfAuthContract);
        numericProcess = NumericProcess(addressOfNumericContract);
        stringProcess = StringProcess(addressOfStringContract);
        provideEvent = ProvideEvent(addressOfProvideEventContract);
    }

     function auth(address walletAddress) external returns (string memory) {
        try authentication.register(walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function getNumericEvent(address walletAddress) external view returns (string memory) {
        try provideEvent.getNumericQuestions(walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function getStringEvent(address walletAddress) external view returns (string memory) {
        try provideEvent.getStringQuestions(walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function answerNumericQuestion(uint256 questionId, uint256 answerContent, address walletAddress) external returns (string memory) {
        try numericProcess.answerQuestion(questionId, answerContent, walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

     function answerStringQuestion(uint256 questionId, string memory answerContent, address walletAddress) external returns (string memory) {
        try stringProcess.answerQuestion(questionId, answerContent, walletAddress) {
            return "success";
        } catch {
            return "invalid";
        }
     }

}