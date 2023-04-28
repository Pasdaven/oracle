## Oracle

A blockchain oracle platform built with Hardhat and Solidity.

## Getting Started

1. Install dependencies by running:

```bash
npm install
```

1. Set up Ganache as a local Ethereum blockchain environment. Refer to [https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/) for more information.
2. Copy the environment variable file:

```bash
cp .env.example .env
```

1. Set up the environment variables:

```bash
PRIVATE_KEY= <- Enter the wallet private key here
PROVIDER_URL= <- Enter the Ganache RPC server URL. Default is <http://127.0.0.1:7545>
```

1. Write the deployment script in `scripts/deploy.ts`.
2. Deploy the contract to the local blockchain:

```bash
npx hardhat run scripts/deploy.ts --network localganache
```