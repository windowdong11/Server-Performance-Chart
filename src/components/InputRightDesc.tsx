import { FormControl, InputGroup } from "react-bootstrap";
import { InputProps } from "../types/input";




export default function InputRightDesc({ description, value, onChange, children, placeholder, size="sm"} : InputProps) {
    return (
        <InputGroup className="mb-3" size={size}>
            <FormControl
                placeholder={placeholder}
                onChange={onChange}
                value = {value}
                children={children}
                className="text-right"
            />
            <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">{description}</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
    )
}