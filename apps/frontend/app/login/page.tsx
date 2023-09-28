'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { connectWallet } from '@/lib/metamask';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import { Alert } from '@/components/ui/alert';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function WalletPage() {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Metamask login is in progress
    const checkLogin = async () => {
      if (!window.ethereum) return;
      const accounts = window.ethereum.selectedAddress;
      if (accounts) {
        router.push('/dashboard');
      } else {
        setAccount('');
      }
    };

    checkLogin();
    setIsLoading(false); // Metamask login is complete
  }, [account, router]);

  const handleConnectWallet = async () => {
    await connectWallet(setError, setAccount);
  };

  if (isLoading) return <></>; // wait for Metamask login to complete

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Oracle
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Oracle: Setting the Gold Standard, Outshining Chain
                Link.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] relative">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create or Login account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter Oracle with your Metamask
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Button
                  variant="secondary"
                  className="py-5"
                  onClick={handleConnectWallet}
                >
                  <Image
                    src="/images/metamask-fox.svg"
                    width={25}
                    height={25}
                    alt="Metamask Fox"
                    className="mr-2"
                  />
                  Login In with Metamask
                </Button>
              </div>
            </div>
            <div className="absolute -bottom-16 w-full">
              {error === 'Please Install MetaMask.' && (
                <div
                  className="cursor-pointer group"
                  onClick={() => setError('')}
                >
                  <Alert variant="destructive" className="text-center">
                    <ExclamationTriangleIcon className="mr-2" />
                    <span className="group-hover:hidden">
                      Please Install Metamask
                    </span>
                    <span className="hidden group-hover:block">
                      Click To Close
                    </span>
                  </Alert>
                </div>
              )}
              {error !== '' && error !== 'Please Install MetaMask.' && (
                <div
                  className="cursor-pointer group"
                  onClick={() => setError('')}
                >
                  <Alert variant="destructive" className="text-center">
                    <ExclamationTriangleIcon className="mr-2" />
                    <span className="group-hover:hidden">
                      Metamask Connect Error
                    </span>
                    <span className="hidden group-hover:block">
                      Click To Close
                    </span>
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
