import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import './App.css';

const calendarDates = Array(31)
    .fill(0)
    .map((e, i) => i + 1);

const StyledDateChooser = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button<{ isChoosing: boolean }>`
    color: #0b204c;
    text-transform: uppercase;
    flex: 1;
    padding: 15px;
    background: none;
    cursor: pointer;
    border: none;
    border-bottom: 2px solid rgba(11, 32, 76, 0.2);
    outline: none;
    border-color: ${(props) => (props.isChoosing ? '#0b204c' : 'none')};

    span {
        display: block;
        min-height: 60px;
        font-size: 50px;
    }
`;

const StyledCalendar = styled.div`
    max-width: 400px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background: #0b204c;
    color: #fff;
    padding: 20px;
`;

const StyledCalendarDay = styled.button<{ isInBetween: boolean; isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    transition: 0.3s ease background;
    border: none;
    outline: none;
    cursor: pointer;
    color: #8096c1;
    background: none;

    ${(props) =>
        props.isInBetween &&
        css`
            background: #254381 !important;
            color: #eee;
        `}

    ${(props) =>
        props.isSelected &&
        css`
            background: #1a1a1a !important;
            color: #eee;
        `}

  &:hover {
        color: #eee;
        background: #254381;
    }
`;

const App: FC = () => {
    const [choosingType, setChoosingType] = useState<'start' | 'end'>('start');
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [hoverDate, setHoverDate] = useState(0);

    const updateDate = (chosenDay: number) => {
        // handle if a user chose before our current range
        if (startDate && chosenDay < startDate) {
            setStartDate(chosenDay);
            return setChoosingType('end');
        }

        // handle if a user chose after our current range
        if (endDate && chosenDay > endDate) {
            setEndDate(chosenDay);
            return setChoosingType('end');
        }

        if (choosingType === 'start') {
            setStartDate(chosenDay);
            return setChoosingType('end');
        }

        if (choosingType === 'end') {
            setEndDate(chosenDay);
            setChoosingType('start'); //for the case choose the end date before start date
        }
    };

    const checkInBetween = (day: number) => {
        if (startDate && !endDate) return day > startDate && day < hoverDate;

        // Chosen end date first and show hover to before date properly
        // awesome addition to handle choosing end date first by https://github.com/tunglam87
        if (endDate && !startDate) return day < endDate && day > hoverDate;

        return day > startDate && day < endDate;
    };

    return (
        <>
            <StyledDateChooser>
                <StyledDateChooserButton onClick={() => setChoosingType('start')} isChoosing={choosingType === 'start'}>
                    Start Date <span>{startDate}</span>
                </StyledDateChooserButton>
                <StyledDateChooserButton onClick={() => setChoosingType('end')} isChoosing={choosingType === 'end'}>
                    End Date <span>{endDate}</span>
                </StyledDateChooserButton>
            </StyledDateChooser>

            <StyledCalendar>
                {calendarDates.map((day, index) => {
                    const isInBetween = checkInBetween(day);
                    const isSelected = day === startDate || day === endDate;

                    return (
                        <StyledCalendarDay
                            key={index}
                            isInBetween={isInBetween}
                            isSelected={isSelected}
                            onClick={() => updateDate(day)}
                            onMouseOver={() => setHoverDate(day)}
                        >
                            {day}
                        </StyledCalendarDay>
                    );
                })}
            </StyledCalendar>
        </>
    );
};

export default App;
