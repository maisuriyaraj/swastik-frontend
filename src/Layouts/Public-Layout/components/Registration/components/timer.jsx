import React, { useState, useEffect } from 'react';

const Timer = (props) => {
    const [seconds, setSeconds] = useState(600); // 10 minutes in seconds
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let timer;

        if (props.active && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isActive, seconds]);

    const toggleTimer = () => {
        setIsActive((prevIsActive) => !prevIsActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(600);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const remainingSeconds = timeInSeconds % 60;
        const formattedTime =
            String(minutes).padStart(2, '0') +
            ':' +
            String(remainingSeconds).padStart(2, '0');
        return formattedTime;
    };

    return (
        <div>
            <span>{formatTime(seconds)}</span>
        </div>
    );
};

export default Timer;
