export interface InputProps {
    description?: string

    value?: string | number
    onChange? : React.ChangeEventHandler<HTMLInputElement>

    children?: React.ReactChild
    placeholder?: string
    label?: string
    size? : "sm" | "lg"
}