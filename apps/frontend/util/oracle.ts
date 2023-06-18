import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Controller from '../../blockchain/artifacts/contracts/Controller.sol/Controller.json';

const web3 = new Web3('http://localhost:8545');

const ControllerABI = Controller.abi;
const contractAddress = '';
const controller = new web3.eth.Contract(
    ControllerABI as AbiItem[],
    contractAddress
);

export const authenticate = async (walletAddress: string) => {
    const request = await controller.methods.auth(walletAddress).call();
    return request;
};

export const getNumericEvent = async (walletAddress: string) => {
    const request = await controller.methods
        .getNumericEvent(walletAddress)
        .call();
    return request;
};

export const getStringEvent = async (walletAddress: string) => {
    const request = await controller.methods
        .getStringEvent(walletAddress)
        .call();
    return request;
};

export const answerNumericQuestion = async (
    questionId: number,
    answerContent: number,
    walletAddress: string
) => {
    const request = await controller.methods
        .answerNumericQuestion(questionId, answerContent, walletAddress)
        .call();
    return request;
};

export const answerStringQuestion = async (
    questionId: number,
    answerContent: string,
    walletAddress: string
) => {
    const request = await controller.methods
        .answerStringQuestion(questionId, answerContent, walletAddress)
        .call();
    return request;
};
