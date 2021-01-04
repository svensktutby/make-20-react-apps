import React, { FC, useState, useRef } from 'react';
import './App.css';

const padTime = (time: number): string => time.toString().padStart(2, '0');

export const App: FC = () => {
  const period = 25 * 60;

  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [timeLeft, setTimeLeft] = useState(period);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle("You're doing great!");
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevState) => {
        if (prevState >= 1) return prevState - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setTitle('Keep it up!');
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setTitle('Ready to go another round?');
    setTimeLeft(period);
    setIsRunning(false);
  };

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - Number(minutes) * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {isRunning ? (
          <button onClick={stopTimer}>Stop</button>
        ) : (
          <button onClick={startTimer}>Start</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};
