'use client';

import { connectWallet } from '@/util/metamask';
import { useState } from 'react';

export default function WalletPage() {
    const [account, setAccount] = useState('');
    const [error, setError] = useState('');

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="flex justify-center w-full">
                <h1 className="text-4xl font-bold">Metamask authentication</h1>
            </div>
            <div className="flex justify-center w-full py-5">
                {account ? (
                    <div>
                        <p className="px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white">
                            {account}
                        </p>
                    </div>
                ) : (
                    <button
                        className="px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
                        onClick={() => connectWallet(setError, setAccount)}
                    >
                        Connect
                    </button>
                )}
                {error && (
                    <p className={`error shadow-border`}>{`Error: ${error}`}</p>
                )}
            </div>
        </main>
    );
}
