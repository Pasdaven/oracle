## Oracle

A blockchain oracle platform built with Hardhat and Solidity.

## Getting Started

1. Install dependencies by running:

    ```bash
    pnpm install
    ```

2. Running modes:

    To build the project for production deployment, use:
    ```bash
    pnpm run build
    ```

    To start the development mode, use:
    ```bash
    pnpm run dev
    ```

    To deploy the project to a local blockchain, use:
    
    1. Deploy the `Address Record` contract first.
        ```bash
        pnpm run contract:deploy-addressRecord
        ```

    2. Set the `Address Record` contract address to the `apps/blockchain/.env` file.
    3. Deploy the `Oracle` contract.
        ```bash
        pnpm run contract:deploy
        ```


3. Code quality checks by running:

    ```bash
    pnpm run lint
    pnpm run format-check
    ```

4. To format the entire codebase via prettier:

    ```bash
    pnpm run format
    ```
