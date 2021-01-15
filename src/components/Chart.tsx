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
    max: number,
    min: number,
    median: number,
    data: GraphData,
}

function parseChartData(json: Artillery, gap : number) : parseChartDataResult {
    let latencies = json.intermediate[0].latencies.sort((a, b) => a - b)
    const min = latencies[0], max = latencies[latencies.length - 1]
    const lines = Math.ceil((max - min) / gap) + 1//10
    const labels = Array.from(Array(lines), (_, index) => min + gap * index)
    const labelAreas = Array(...labels.map((value) => Math.floor(value + gap / 2)))
    let data = Array(lines).fill(0)
    latencies.forEach((value) => {
        for (let index = 0; index < labelAreas.length; index++) {
            if (value <= labelAreas[index]) {
                data[index]++
                return
            }
        }
    })
    console.log(latencies)
    console.log(data)
    return {
        labels: labels,
        max,
        min,
        median: json.intermediate[0].latency.median,
        data: {
            label: "test", // Should change to input or dev-defined value
            backgroundColor: "", // Should define
            borderColor: "", // Should define
            fill: true,
            data: data
        },
    }
}

export default function Chart(chartProps : ChartProps) {
    //const [isProcessed, setIsProcessed] = useState<boolean[]>([])
    const graphData : GraphData[] = []
    let label : number[] = []
    let prevMax : number = 0
    chartProps.jsons.forEach((json, index) => {
        const {labels, max, data} = parseChartData(json, chartProps.gap)
        graphData.push(data)
        if(prevMax < max){
            label = labels
        }
    })
    const chartData : ChartData = {
        labels: label.toString().split(','),
        datasets: graphData,
    }
    return (
    <>
    Test
        <Line data={chartData} options={options} />
    </>
    )
}