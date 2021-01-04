import { useState } from "react";
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { onChangeFunc } from "../types/eventHandler";


interface OptionButtonProps {
    options: {name: string, value: string}[]
    selectedValue: string  
    onChange: React.ChangeEventHandler<HTMLInputElement>
}


export default function OptionButton({ options, selectedValue, onChange } : OptionButtonProps) {

    return (
        <ButtonGroup toggle className="optionbutton">
            {options.map((option, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={onChange}
                >
                    {option.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
}