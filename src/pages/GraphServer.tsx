import React from 'react'
import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Endpoints, fetchAPI, HttpMethod } from '../action/fetch'
import Chart from '../components/Chart'
import InputRightDesc from '../components/InputRightDesc'

import OptionButton from '../components/OptionButton'
import RequestOptions from '../components/RequestOptions'
import { buttonChange, inputChange } from '../types/events'

/*
input
    request count
    client count
    request Server
    request type
output
    response time
*/

const testData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
        {
            label: 'GQL',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            fill: true,
            backgroundColor: 'rgba(255, 99, 133, 0.144)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
            label: 'Rest',
            data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            fill: true,
            backgroundColor: 'rgba(117, 255, 99, 0.151)',
            borderColor: 'rgba(99, 255, 125, 0.2)',
        },
        {
            label: 'ProtoBuf',
            data: [2, 4, 4, 1, 3, 5, 6, 7, 8, 4],
            fill: true,
            backgroundColor: 'rgba(185, 99, 255, 0.151)',
            borderColor: 'rgba(180, 99, 255, 0.2)',
        },
    ],
}

interface queryResult {
    id: number
    startTime?: number
    endTime?: number
    elaspedTime?: number
    requestState: RequestState
}

enum RequestState {
    loading = 'loading',
    end = 'end',
}

const GraphServer = () => {
    // input 입력용
    const [clientCnt, setClientCnt] = useState('')
    const [duration, setDuration] = useState('')
    const [arrivalRate, setArrivalRate] = useState('')

    // 서버 선택 버튼
    const [selectedServer, setSelectedServer] = useState('1')
    const buttonOptions = [
        { name: 'GraphQL', value: '1' },
        { name: 'ProtoBuf', value: '2' },
        { name: 'RestAPI', value: '3' },
    ]

    // 테스트 버튼
    const onTest = () => {
        console.log("Todo 1 : Send request when click Test button.")
        console.log("Todo 2 : Change response to graph data.")
        console.log("Todo 3 : Display Chart with graph data.")
    }

    return (
        <Container>
            <Row xl={{cols: 2}} lg={{cols: 1}}>
                <Col xl={{span: 9}}>
                    <Chart title={"Performance"} data={testData} />
                </Col>
                <Col xl={{span: 3}} lg={{span: 5}} md={{span: 5}} sm={{span: 5}} xs={{span: 5}}>
                    <RequestOptions clientCnt={clientCnt} clientCntOnChange={(e) => { setClientCnt(e.target.value) }}
                        duration={duration} durationOnChange={(e) => { setDuration(e.target.value)}}
                        arrivalRate={arrivalRate} arrivalRateOnChange={(e)=> {setArrivalRate(e.target.value)}}>
                        <OptionButton options={buttonOptions} selectedValue={selectedServer}
                            onChange={(e) => { setSelectedServer(e.target.value) }}></OptionButton>
                    </RequestOptions>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="dark" block onClick={onTest}>Test</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default GraphServer