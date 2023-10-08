import { Contract, ethers } from 'ethers';
import controllerAbi from '../../blockchain/artifacts/contracts/Controller.sol/Controller.json';

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
  const contractAddress = process.env.NEXT_PUBLIC_CONTROLLER_CONTRACT_ADDRESS as string;
  const contractABI = controllerAbi.abi;
  const contract = new Contract(contractAddress, contractABI, signer);
  return contract;
};

export const getWalletBalance = async (walletAddress: string) => {
  try {
    const signer = await getSigner();
    const balanceWei: bigint = await signer.provider.getBalance(walletAddress);

    const balanceEther = parseFloat(ethers.formatEther(balanceWei)).toFixed(4);

    return balanceEther;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return null;
  }
};

export const authenticate = async (walletAddress: string) => {
  const contract = await getContract();
  const request = await contract.auth(walletAddress, {
    gasLimit: 1000000,
    gasPrice: 1000000000,
  });
  const response = await request.wait();
  console.log(response);
  return response;
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

export const getReputationScores = async (walletAddress: string) => {
  const contract = await getContract();
  const request = await contract.getReputationScores(walletAddress);
  return request;
};
