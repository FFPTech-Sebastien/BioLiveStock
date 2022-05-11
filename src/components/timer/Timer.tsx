import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface TimerProps {}

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const Timer: React.FC<TimerProps> = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const setTimer = () => {
            const now = new Date();
            setTime(now.toLocaleDateString('en-UK', options));
        };
        setTimer();
        const interval = setInterval(setTimer, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                }}
            >
                {time}
            </Text>
        </View>
    );
};

export default Timer;
