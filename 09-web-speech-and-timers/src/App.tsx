import React, { FC } from 'react';

import './App.css';

const App: FC = () => {
    return (
        <div className="app">
            <h2>Talk the Talk</h2>

            <div className="timers">
                {/* timers go here */}
                <form className="timer">
                    <input type="number" />
                    <input type="text" />
                </form>

                <button className="add-button">Add</button>
            </div>

            {/* seconds */}
            <h2>0</h2>

            {/* buttons */}
            <div className="buttons">
                <button className="start-button">Start</button>
                <button className="stop-button">Stop</button>
            </div>
        </div>
    );
};

export default App;
