export interface GraphData {
    label?: string
    data?: number[]
    fill?: boolean
    backgroundColor?: string
    borderColor?: string
    showLine?: boolean
}

export interface ChartData {
    labels?: string[],
    datasets?: Array<GraphData>
}

export interface ChartProps {
    jsons: Artillery[],
    gap: number,
}