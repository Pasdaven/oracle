import { ethers } from 'ethers';
import controllerAbi from '../../blockchain/artifacts/contracts/Controller.sol/Controller.json';

const contractAddress = '';
const contractABI = controllerAbi.abi;
const provider = new ethers.JsonRpcProvider();

const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const authenticate = async (walletAddress: string) => {
    const request = await contract.auth(walletAddress);
    return request;
};

export const getNumericEvent = async (walletAddress: string) => {
    const request = await contract.getNumericEvent(walletAddress);
    return request;
};

export const getStringEvent = async (walletAddress: string) => {
    const request = await contract.getStringEvent(walletAddress);
    return request;
};

export const answerNumericQuestion = async (
    questionId: number,
    answerContent: number,
    walletAddress: string
) => {
    const request = await contract.answerNumericQuestion(
        questionId,
        answerContent,
        walletAddress
    );
    return request;
};

export const answerStringQuestion = async (
    questionId: number,
    answerContent: string,
    walletAddress: string
) => {
    const request = await contract.answerStringQuestion(
        questionId,
        answerContent,
        walletAddress
    );
    return request;
};
