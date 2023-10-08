'use client';

import { useEffect, useState } from 'react';
import { Event, getNumericEvent } from '@/lib/oracle';

const NumericEventPage = () => {
    const [numericEvents, setNumericEvents] = useState<Event[] | null>(null);

    useEffect(() => {
        const fetchNumericEvent = async () => {
            try {
                const result = await getNumericEvent('0x');
                setNumericEvents(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNumericEvent();
    }, []);

    if (!numericEvents) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Numeric Event</h1>
            {numericEvents.map((data, index) => (
                <div key={index}>
                    <p>ID: {data.id}</p>
                    <p>Question: {data.id}</p>
                </div>
            ))}
        </div>
    );
};

export default NumericEventPage;
