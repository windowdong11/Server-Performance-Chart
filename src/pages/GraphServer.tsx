import React from 'react'
import { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Endpoints, fetchAPI, HttpMethod, MiddleServerData } from '../action/fetch'
import Chart from '../components/Chart'
import InputRightDesc from '../components/InputRightDesc'
import RangeInput from 'react-bootstrap-range-slider'

import OptionButton from '../components/OptionButton'
import RequestOptions from '../components/RequestOptions'
import { ChartData, ChartProps, GraphData } from '../types/chart'
import { parse } from 'path'

/*
input
    request count
    client count
    request Server
    request type
output
    response time
*/
/*
1. 간격설정(input)
2. 라벨값 설정(function)
3. 데이터 정제(라벨에 맞게 설정)

데이터 정제과정
1. 레이턴시 추출
2. 모든 레이턴시에 대해 "각 라벨의 범위에 맞게 라벨별로 레이턴시 수" 정제
 */
let testData: ChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
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
    const [clientCnt, setClientCnt] = useState('2')
    const [duration, setDuration] = useState('2')
    const [arrivalRate, setArrivalRate] = useState('2')
    const [queryId, setQueryId] = useState('1')
    const [gap, setGap] = useState(100000)

    // chart용
    const [chartJsons, setChartJsons] = useState<Artillery[]>([])
    const [chartData, setChartData] = useState<ChartData>(testData)

    // 서버 선택 버튼
    const [selectedServer, setSelectedServer] = useState('2')
    const serverOptions = [
        { name: 'GraphQL', value: '0', midUrl: Endpoints.MiddleServer + '/gql', originUrl: Endpoints.GraphQL },
        { name: 'ProtoBuf', value: '1', midUrl: Endpoints.MiddleServer + '/protobuf', originUrl: Endpoints.ProtoBuf },
        { name: 'RestAPI', value: '2', midUrl: Endpoints.MiddleServer + '/rest', originUrl: Endpoints.RestAPI },
    ]

    // 쿼리옵션 선택 버튼
    const [selectedQuery, setSelectedQuery] = useState('1')
    const queryOptions = [
        { name: 'All', value: '0' },
        { name: 'ById', value: '1' },
    ]

    // 테스트 버튼
    const onTest = () => {
        const optionIdx = parseInt(selectedServer)
        const detailUrl = `/${selectedQuery === '0' ? 'all' : queryId}`
        const midServerAddress = serverOptions[optionIdx].midUrl + detailUrl
        const requestData: MiddleServerData = {
            address: serverOptions[optionIdx].originUrl + detailUrl,
            arrivalRate: arrivalRate,
            clientCount: clientCnt,
            duration: duration,
        }
        fetchAPI<Artillery>(midServerAddress, requestData, HttpMethod.Post)
            .then((json) => {
                setChartJsons([...chartJsons, json])
                console.log("done")
            })
            .catch(error => {
                console.log('response error while requesting to midServer in [Performance" page, "test" button]')
                console.log(error)
            })
    }

    return (
        <Container>
            <Row>
                <h1>Performance</h1>
            </Row>
            <Row xl={{ cols: 2 }} lg={{ cols: 1 }}>
                <Col xl={{ span: 9 }}>
                    <Chart jsons={chartJsons} gap={gap}/>
                </Col>
                <Col xl={{ span: 3 }} lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 5 }}>
                    <Row>
                    <Col xl={4}>
                        <InputGroup className="mb-3" size="sm">
                            <Form.Control
                                value={gap}
                                onChange={e => setGap(Math.min(10000000, Math.max(10000, parseInt(e.target.value))))}
                                />
                        </InputGroup>
                    </Col>
                    <Col xl={8} >
                        <RangeInput min={10000} max={10000000} step={10000} value={gap} onChange={(_, value) => setGap(value)} />
                    </Col>
                    </Row>
                    <RequestOptions clientCnt={clientCnt} clientCntOnChange={(e) => { setClientCnt(e.target.value) }}
                        duration={duration} durationOnChange={(e) => { setDuration(e.target.value) }}
                        arrivalRate={arrivalRate} arrivalRateOnChange={(e) => { setArrivalRate(e.target.value) }}>
                        <>
                            <OptionButton options={serverOptions} selectedValue={selectedServer}
                                onChange={(e) => { setSelectedServer(e.target.value) }}></OptionButton>
                            <OptionButton options={queryOptions} selectedValue={selectedQuery}
                                onChange={(e) => { setSelectedQuery(e.target.value) }}></OptionButton>
                            {selectedQuery !== '0' &&
                                <InputRightDesc value={queryId} onChange={e => setQueryId(e.target.value)} description="ID" />
                            }
                        </>
                    </RequestOptions>
                    <Button variant="dark" block onClick={onTest}>Test</Button>
                </Col>
                <Col>
                </Col>
            </Row>
            {gap}
        </Container>
    )
}

export default GraphServer