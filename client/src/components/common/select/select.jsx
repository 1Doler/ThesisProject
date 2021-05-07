import React from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const SelectInput = (props) =>{
    const select_color= '#ccff90';
    const customStyles = {
        input: (provided,state) =>({
            display: 'flex',
            alignItems: 'center',
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor:  select_color,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            backgroundColor: '#F5F5F5',
            '&:hover': {
            backgroundColor: '#ffffc2'
            },
            height: 35,
            width: 650,
            minHeight: 23
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            paddingTop: 0,
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            height: 15,
            paddingTop: 0
        }),
    };
    const animatedComponents = makeAnimated();
    return(
        <Select
            isMulti={props.isMulti}
            styles={customStyles}
            components={animatedComponents}
            options = {props.options}
        />
    )
}

export default SelectInput;