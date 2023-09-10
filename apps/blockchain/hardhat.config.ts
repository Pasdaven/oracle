import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { HttpNetworkAccountsUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    ganache: {
      url: 'http://localhost:7545',
      chainId: 1337,
      accounts: process.env.PRIVATE_KEY as HttpNetworkAccountsUserConfig,
    },
  },
};

export default config;
