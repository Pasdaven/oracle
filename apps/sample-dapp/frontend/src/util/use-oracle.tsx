import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Oracle from '../../../../blockchain/artifacts/contracts/Oracle.sol/Oracle.json';
import Callback from '../../../blockchain/artifacts/contracts/Callback.sol/Callback.json';

const web3 = new Web3('http://localhost:8545');

export interface question {
  dataType: 'Numeric' | 'String';
  question: string;
  callBackAddress: string;
}

const OracleABI = Oracle.abi;
const contractAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';
const oracle = new web3.eth.Contract(OracleABI as AbiItem[], contractAddress);

const CallbackABI = Callback.abi;
const callbackAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';
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
