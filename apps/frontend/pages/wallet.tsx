import 'tailwindcss/tailwind.css';
import { AppContext } from '../components/metamask';
import React, { useContext } from 'react';

export default function WalletPage() {
    const { account, connectWallet, error } = useContext(AppContext);

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
                        onClick={connectWallet}
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
