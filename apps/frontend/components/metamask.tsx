import React, { createContext, useEffect, useState, ReactNode } from 'react';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const AppContext = createContext<{
    account: string;
    connectWallet: () => void;
    error: string;
}>({
    account: '',
    connectWallet: () => {},
    error: '',
});

interface MetamaskProps {
    children: ReactNode;
}

const Metamask = ({ children }: MetamaskProps) => {
    const [account, setAccount] = useState('');
    const [error, setError] = useState('');

    const checkEthereumExists = (): boolean => {
        if (!window.ethereum) {
            setError('Please Install MetaMask.');
            return false;
        }
        return true;
    };

    const connectWallet = async (): Promise<void> => {
        setError('');
        if (checkEthereumExists()) {
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

    return (
        <AppContext.Provider value={{ account, connectWallet, error }}>
            {children}
        </AppContext.Provider>
    );
};

export default Metamask;
