import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(1500); // статус оставшихся минут, 25 минут в секундах (25 * 60)
    const [isActive, setIsActive] = useState(false); // статус таймера активен или нет

    useEffect (() => {
        let timer = null;

        if (isActive && timeLeft > 0) {
            // запустили интервал, каждую секунду время уменьшается на одну секунду 
            setInterval (()=> {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft - 1);
                }    
            }, 1000)
        }
        else if (timeLeft === 0) {
            // очистили интервал
            clearInterval(timer);
            alert('Time is up!');
        }

        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    // форматирование времени в mm:ss
    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds < 10 ? '0': ''}${seconds}`;
    }

    // запуск или остановка таймера
    const toggleTimer = () => {
        setIsActive(!isActive);
    }

    // сброс таймера
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(1500);
    }

    return (
        <div>
            <h1>{formatTime(timeLeft)}</h1>
            <button onClick={toggleTimer}>{isActive ? 'Пауза' : 'Старт'}</button>
            <button onClick={resetTimer}>Сброс</button>
        </div>
    )
}

export default Timer;