import React from 'react'
import { Line } from 'react-chartjs-2'

interface ChartData {
    labels: string[],
    datasets : Array<{
        label: string
        data: number[]
        fill?: boolean
        backgroundColor: string
        borderColor: string
        showLine?: boolean
    }>
}
interface ChartProps {
    data : ChartData
}

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
}

export default function Chart({ data }: ChartProps) {
    return (
    <>
        <Line data={data} options={options} />
    </>
    )
}