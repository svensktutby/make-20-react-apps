import React, { FC, useState } from 'react';

export type Timer = {
    time: number;
    text: string;
};

type TimerSlotProps = {
    index: number;
    timer: Timer;
    updateTimers: (index: number, time: number, text: string) => void;
};

const TimerSlot: FC<TimerSlotProps> = ({ index, timer, updateTimers }) => {
    const [time, setTime] = useState(timer.time);
    const [text, setText] = useState(timer.text);

    function handleBlur() {
        updateTimers(index, time, text);
    }

    return (
        <form className="timer" key={index}>
            <input type="number" value={time} onChange={(e) => setTime(+e.target.value)} onBlur={handleBlur} />
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} onBlur={handleBlur} />
        </form>
    );
};

export default TimerSlot;
