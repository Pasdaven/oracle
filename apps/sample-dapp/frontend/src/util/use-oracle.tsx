import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Oracle from '../../../../blockchain/artifacts/contracts/Oracle.sol/Oracle.json';
import Callback from '../../../blockchain/artifacts/contracts/Callback.sol/Callback.json';

const web3 = new Web3('http://localhost:7545');

export interface question {
  dataType: 'Numeric' | 'String';
  question: string;
  callBackAddress: string;
}

const OracleABI = Oracle.abi;
const contractAddress = '0x87678B8B3436C5B0a83c91A6Ed65936288f2D44d';
const oracle = new web3.eth.Contract(OracleABI as AbiItem[], contractAddress);

const CallbackABI = Callback.abi;
const callbackAddress = '0x1Aa4dBb6C851E1b90df06D328e875AB1041a70aD';
export const callback = new web3.eth.Contract(
  CallbackABI as AbiItem[],
  callbackAddress
);

const useOracle = () => {
  const askOracle = async (question: question) => {
    try {
      await oracle.methods.processRequest(question).call();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const subscribeOracle = () => {
    callback.events
      .receiveEvent()
      .on('data', (event: any) => {
        console.log('事件數據：', event.returnValues);
      })
      .on('error', (error: any) => {
        console.error('錯誤：', error);
      });
  };

  return { askOracle, subscribeOracle };
};

export { useOracle };
