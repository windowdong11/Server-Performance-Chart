import React from 'react'
import { Line } from 'react-chartjs-2'

interface ChartProps {
    title: string
    data : ChartData
}
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

export default function Chart({ title, data }: ChartProps) {
    return (
    <>
        <h1>{title}</h1>
        <Line data={data} options={options} />
    </>
    )
}