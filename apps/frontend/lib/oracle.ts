import { Contract, ethers } from 'ethers';
import controllerAbi from '../../blockchain/artifacts/contracts/Controller.sol/Controller.json';

export type Event = {
    id: number;
    question: string;
};

const getProvider = () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider;
};

const getSigner = async () => {
  const signer = await getProvider().getSigner();
  return signer;
};

const getContract = async () => {
  const signer = await getSigner();
  const contractAddress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1';
  const contractABI = controllerAbi.abi;
  const contract = new Contract(contractAddress, contractABI, signer);
  return contract;
};

export const authenticate = async (walletAddress: string) => {
  const contract = await getContract();
  const request = await contract.auth(walletAddress);
  return request;
};

export const getNumericEvent = async (walletAddress: string) => {
  const contract = await getContract();
  const request = await contract.getNumericEvent(walletAddress);
  return request;
};

export const getStringEvent = async (walletAddress: string) => {
  const contract = await getContract();
  const request = await contract.getStringEvent(walletAddress);
  return request;
};

export const answerNumericQuestion = async (
  questionId: number,
  answerContent: number,
  walletAddress: string
) => {
  const contract = await getContract();
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
  const contract = await getContract();
  const request = await contract.answerStringQuestion(
    questionId,
    answerContent,
    walletAddress
  );
  return request;
};
