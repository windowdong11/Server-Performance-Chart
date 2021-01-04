import { FormControl, InputGroup } from "react-bootstrap";
import { onChangeFunc } from "../types/eventHandler";


interface InputRightDescProps {
    description: string

    value?: string
    onChange? : React.ChangeEventHandler<HTMLInputElement>

    children?: React.ReactChild
    placeholder?: string
    size? : "sm" | "lg"
}

export default function InputRightDesc({ description, value, onChange, children, placeholder, size="sm"} : InputRightDescProps) {
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