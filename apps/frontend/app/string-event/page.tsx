'use client';

import { useController } from '@/lib/stringEvent';
import { useState } from 'react';

export default function StringEventPage() {
  const [event, setEvent] = useState<string>('');

  const { getStringEvent } = useController();

  const handleGetStringEvent = async () => {
    const event = await getStringEvent();
    setEvent(event);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex justify-center w-full">
        <h1 className="text-4xl font-bold">String Event</h1>
      </div>
      <div className="flex justify-center w-full py-5">
        <button
          className="px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
          onClick={handleGetStringEvent}
        >
          Get String Event
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
