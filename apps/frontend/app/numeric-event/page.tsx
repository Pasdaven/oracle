'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getNumericEvent as fetchNumericEvent } from '@/lib/oracle';
import { checkMetamaskLogin } from '@/lib/metamask';

export default function NumberEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkMetamaskLogin();
      if (!isLoggedIn) {
        router.push('/login'); // redirect to login page
      } else {
        setIsLoading(false); // Metamask login is complete
      }
    };

    checkLogin();
  }, [router]);

  const [event, setEvent] = useState<string>('');

  const fetchData = async () => {
    const metamaskAccount = window.ethereum.selectedAddress;
    try {
      const eventContent = await fetchNumericEvent(metamaskAccount || '');
      setEvent(eventContent);
    } catch (error) {
      console.error('發生錯誤：', error);
    }
  };

  if (isLoading) return null; // wait for Metamask login to complete

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex justify-center w-full">
        <h1 className="text-4xl font-bold">Numeric Event</h1>
      </div>
      <div className="flex justify-center w-full py-5">
        <button
          className="px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
          onClick={fetchData}
        >
          Get Numeric Event
        </button>
      </div>
      <div className="flex justify-center w-full py-5">
        {event && (
          <p className="px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white">
            {event}
          </p>
        )}
      </div>
    </main>
  );
}
