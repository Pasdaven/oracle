import { MetaMaskInpageProvider } from '@metamask/providers';
import { authenticate } from '@/lib/oracle';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const checkEthereumExists = (setError: (message: string) => void): boolean => {
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
      const accounts = await window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts.length > 0) {
        console.log(accounts);
        setAccount(accounts[0] as string);
        authenticate(accounts[0] as string);
      } else {
        setError('No accounts found.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  }
};

export const checkMetamaskLogin = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false; // Metamask not installed or not enabled
  }

  try {
    const accounts = await window.ethereum.request<string[]>({
      method: 'eth_accounts',
    });

    if (accounts && accounts.length > 0) {
      return true; // Metamask is login
    } else {
      return false; // Metamask is not login
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
