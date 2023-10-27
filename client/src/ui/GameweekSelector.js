import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'


export const GameweekSelector = ({ gameweekNumber, setGameweekToView }) => {
    const generateGameweekOptions = () => {
        const options = [];
        for (let i = 1; i <= 38; i++) {
          options.push({ value: i, label: `Gameweek ${i}` });
        }
        return options;
      }

      const gameweekOptions = generateGameweekOptions();


    return (
        <Select
            defaultValue={gameweekOptions.find(option => option.value === gameweekNumber)}
            options={gameweekOptions}
            onChange={(selectedOption) => setGameweekToView(selectedOption.value)}
        />
    )
};
