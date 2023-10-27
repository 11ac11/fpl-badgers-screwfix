import React from 'react';
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


    return (
        <Select
            defaultValue={gameweekOptions.find(option => option.value === gameweekNumber)}
            options={gameweekOptions}
            onChange={(selectedOption) => setGameweekToView(selectedOption.value)}
            styles={customStyles} // Apply the custom styles
            className="customSelect"
        />
    )
};
