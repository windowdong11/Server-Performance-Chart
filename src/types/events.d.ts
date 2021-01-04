// 사용법 : onChange((e : inputChange) => useStateFunc(e.target.value))
export type inputChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

// 사용법 : onChange((e : buttonChange) => useStateFunc(e.target.value))
export type buttonChange = React.ChangeEvent<HTMLInputElement>