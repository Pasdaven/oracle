import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Controller from '../../blockchain/artifacts/contracts/Controller.sol/Controller.json';

const web3 = new Web3('http://localhost:8545');

const ControllerABI = Controller.abi;
const controllerAddress = '';
export const controller = new web3.eth.Contract(
  ControllerABI as AbiItem[],
  controllerAddress
);

const useController = () => {
  const getStringEvent = async () => {
    try {
      const event = await controller.methods.getStringEvent().call();
      console.log('get string event:', event);
      return event;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { getStringEvent };
};

export { useController };
