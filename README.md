## Oracle

A blockchain oracle platform built with Hardhat and Solidity.

## Getting Started

1. Install dependencies by running:

    ```bash
    npm install
    ```

2. Running modes:

    To build the project for production deployment, use:
    ```bash
    npm run build
    ```

    To start the development mode, use:
    ```bash
    npm run dev
    ```

    To deploy the project to a local blockchain, use:
    
    1. Deploy the `Address Record` contract first.
        ```bash
        npm run contract:deploy-addressRecord
        ```

    2. Set the `Address Record` contract address to the `apps/blockchain/.env` file.
    3. Deploy the `Oracle` contract.
        ```bash
        npm run contract:deploy
        ```


3. Code quality checks by running:

    ```bash
    npm run lint
    npm run format-check
    ```

4. To format the entire codebase via prettier:

    ```bash
    npm run format
    ```
