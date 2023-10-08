import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Oracle from '../../../../blockchain/artifacts/contracts/Oracle.sol/Oracle.json';
import Callback from '../../../blockchain/artifacts/contracts/Callback.sol/Callback.json';

const web3 = new Web3('http://localhost:8545');

export interface question {
  dataType: 'Numeric' | 'String';
  question: string;
  callBackAddress?: string;
}

const OracleABI = Oracle.abi;
const contractAddress = import.meta.env.VITE_ORACLE_CONTRACT_ADDRESS;
const oracle = new web3.eth.Contract(OracleABI as AbiItem[], contractAddress);

const CallbackABI = Callback.abi;
const callbackAddress = import.meta.env.VITE_CALLBACK_CONTRACT_ADDRESS;
export const callback = new web3.eth.Contract(
  CallbackABI as AbiItem[],
  callbackAddress
);

const useOracle = () => {
  const askOracle = async (question: question) => {
    question.callBackAddress = callbackAddress;
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceHex = web3.utils.toHex(gasPrice);
      const gasLimitHex = web3.utils.toHex(30000000);

      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      const transactionParameters = {
        to: contractAddress,
        from: userAddress,
        gas: gasLimitHex,
        gasPrice: gasPriceHex,
        data: oracle.methods.processRequest(question).encodeABI(),
      };

      const txReceipt = await web3.eth.sendTransaction(transactionParameters);
      console.log('txReceipt', txReceipt);
      return txReceipt;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getStringResponse = async () => {
    try {
      const stringResponse = await callback.methods.getStringAnswer().call();
      return stringResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getNumericResponse = async () => {
    try {
      const numericResponse = await callback.methods.getNumericAnswer().call();
      return numericResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { askOracle, getStringResponse, getNumericResponse };
};

export { useOracle };
