'use client';

import { useEffect, useState } from 'react';
import { Event, getStringEvent } from '@/lib/oracle';

const StringEventPage = () => {
    const [stringEvents, setStringEvents] = useState<Event[] | null>(null);

    useEffect(() => {
        const fetchStringEvent = async () => {
            try {
                const result = await getStringEvent('0x');
                setStringEvents(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStringEvent();
    }, []);

    if (!stringEvents) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>String Event</h1>
            {stringEvents.map((data, index) => (
                <div key={index}>
                    <p>ID: {data.id}</p>
                    <p>Question: {data.id}</p>
                </div>
            ))}
        </div>
    );
};

export default StringEventPage;
