import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import App from '../../../blockchain/artifacts/contracts/App.sol/App.json';

const web3 = new Web3('http://localhost:8545');

const AppABI = App.abi;
const appAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS;
const app = new web3.eth.Contract(AppABI as AbiItem[], appAddress);

const useBlockchain = () => {
  const getData = async () => {
    try {
      const res = await app.methods.getData().call();
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getData };
};

export { useBlockchain };