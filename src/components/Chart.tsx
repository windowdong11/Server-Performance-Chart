import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { ChartData, ChartProps, GraphData } from '../types/chart'
import usePrev from '../hooks/usePrev'

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

interface parseChartDataResult {
    labels: number[],
    data: GraphData,
}

function parseChartData(json: Artillery, gap : number) : parseChartDataResult {
    let latencies = json.intermediate[0].latencies.sort((a, b) => a - b)
    const min = latencies[0], max = latencies[latencies.length - 1]
    const lines = Math.floor((max - min) / gap) + 1//10
    const labels = Array.from(Array(lines), (_, index) => min + gap * index)
    const labelAreas = Array(0, ...labels.map((value) => Math.floor(value + gap / 2)))
    let data = Array(lines).fill(0)
    latencies.forEach((value) => {
        for (let index = 1; index < labelAreas.length; index++) {
            if (value <= labelAreas[index]) {
                data[index - 1]++
                return
            }
        }
    })
    return {
        labels: labels,
        data: {
            label: "test", // Should change to input or dev-defined value
            backgroundColor: "", // Should define
            borderColor: "", // Should define
            fill: true,
            data: data
        }
    }
}

export default function Chart(chartProps : ChartProps) {
    //const [isProcessed, setIsProcessed] = useState<boolean[]>([])
    const graphData : GraphData[] = []
    let label : string[] = []
    chartProps.jsons.forEach((json, index) => {
        const {labels, data} = parseChartData(json, chartProps.gap)
        graphData.push(data)
        label = labels.toString().split(',')
    })
    const chartData : ChartData = {
        labels: label,
        datasets: graphData,
    }
    return (
    <>
    Test
        <Line data={chartData} options={options} />
    </>
    )
}