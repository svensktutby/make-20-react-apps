import React, { FC } from 'react';

import './App.css';

const calendarDates = Array(31)
    .fill(0)
    .map((e, i) => i);

const App: FC = () => {
    return (
        <>
            <div className="date-chooser">
                <button className="date-chooser-button">
                    Start Date <span>0</span>
                </button>
                <button className="date-chooser-button">
                    End Date <span>0</span>
                </button>
            </div>

            <div className="calendar">
                {calendarDates.map((day, index) => {
                    return <div className="calendar-day">{day + 1}</div>;
                })}
            </div>
        </>
    );
};

export default App;
