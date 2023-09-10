import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Oracle from 'oracle/artifacts/contracts/Oracle.sol/Oracle.json';
import Callback from '../../../blockchain/artifacts/contracts/Callback.sol/Callback.json';

const web3 = new Web3('http://localhost:8545');

export interface question {
  dataType: 'Numeric' | 'String';
  question: string;
  callBackAddress: string;
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
    try {
      await oracle.methods.processRequest(question).call();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const subscribeOracle = () => {
    console.log('Subscribe to Oracle success');
    // callback.events
    //   .receiveEvent()
    //   .on('data', (event: any) => {
    //     console.log('事件數據：', event.returnValues);
    //   })
    //   .on('error', (error: any) => {
    //     console.error('錯誤：', error);
    //   });
  };

  return { askOracle, subscribeOracle };
};

export { useOracle };
