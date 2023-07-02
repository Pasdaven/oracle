'use client';

import { useEffect, useState } from 'react';
import { Events, getNumericEvent } from '@/lib/oracle';

const NumericEventPage = () => {
    const [numericEvents, setNumericEvents] = useState<Events | null>(null);

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
            {numericEvents.question.map((question, index) => (
                <div key={index}>
                    <h2>{question}</h2>
                </div>
            ))}
        </div>
    );
};

export default NumericEventPage;
