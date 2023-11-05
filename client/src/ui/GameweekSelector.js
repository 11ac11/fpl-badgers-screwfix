import React, { useEffect } from 'react';
import Select from 'react-select'


export const GameweekSelector = ({ gameweekNumber, setGameweekToView }) => {
    useEffect(() => {
        if (gameweekNumber) {
            setGameweekToView(gameweekNumber)
        }
        console.log(gameweekNumber, 'in selector')
    }, [gameweekNumber])

    const generateGameweekOptions = () => {
        const options = [];
        for (let i = 1; i <= 38; i++) {
          options.push({ value: i, label: `Gameweek ${i}` });
        }
        return options;
    }

    const gameweekOptions = generateGameweekOptions();

    const customStyles = {
    // Define your custom styles here
    control: (styles, state) => ({
        ...styles,
        fontSize: '20px', // Adjust the font size as needed
        borderColor: state.isSelected ? 'var(--black)' : 'var(--black)', // Highlight color when hovering
        boxShadow: state.isSelected ? '0 0 0 var(--turq)' : 'none',
        ':hover': {
            borderColor: 'var(--turq)', // Highlight color when hovering
            boxShadow: '0 0 0 var(--turq)'
            },
        }),
    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? 'var(--gradient)' : 'white', // Highlight color on hover
        color: state.isSelected ? 'var(--black)' : 'var(--grey)',
        border: state.isSelected ? '0.2rem solid var(--turq)' : 'none',
        fontSize: '16px', // Adjust the font size as needed
        ':hover': {
            background: 'var(--gradient)', // Highlight color when hovering
            },
        }),
    };

    const defaultOption = gameweekNumber
        ? gameweekOptions.find((option) => option.value === gameweekNumber)
        : gameweekOptions[gameweekNumber];

    return (
        gameweekNumber && <Select
            defaultValue={defaultOption}
            options={gameweekOptions}
            onChange={(selectedOption) => setGameweekToView(selectedOption.value)}
            styles={customStyles} // Apply the custom styles
            className="customSelect"
        />
    )
};
