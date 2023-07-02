'use client';

import { useEffect, useState } from 'react';
import { Events, getStringEvent } from '@/lib/oracle';

const StringEventPage = () => {
    const [stringEvents, setStringEvents] = useState<Events | null>(null);

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
            {stringEvents.question.map((question, index) => (
                <div key={index}>
                    <h2>{question}</h2>
                </div>
            ))}
        </div>
    );
};

export default StringEventPage;
