import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

const checkEthereumExists = (
    setError: (message: string) => void
): boolean => {
    if (!window.ethereum) {
        setError('Please Install MetaMask.');
        return false;
    }
    return true;
};

export const connectWallet = async (
    setError: (message: string) => void,
    setAccount: (account: string) => void
): Promise<void> => {
    setError('');
    if (checkEthereumExists(setError)) {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            console.log(accounts);
            setAccount(accounts[0]);
        } catch (err: any) {
            setError(err.message);
        }
    }
};
