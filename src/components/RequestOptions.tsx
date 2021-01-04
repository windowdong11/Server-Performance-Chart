import React, { ReactChild } from "react"
import { Button, Col, Container, Row, RowProps } from "react-bootstrap"
import { inputChange, buttonChange } from "../types/events"
import InputRightDesc from "./InputRightDesc"
import OptionButton from "./OptionButton"

interface RequestOptionsProps {
    style?: RowProps,
    children?: ReactChild,
    clientCnt: string,
    clientCntOnChange: React.ChangeEventHandler<HTMLInputElement>,
    duration: string,
    durationOnChange: React.ChangeEventHandler<HTMLInputElement>,
    arrivalRate: string,
    arrivalRateOnChange: React.ChangeEventHandler<HTMLInputElement>,
    /*
    address: string
    duration: number
    arrivalRate: number
    clientCount: number
     */
}

export default function RequestOptions({style, children, clientCnt, clientCntOnChange, duration, durationOnChange, arrivalRate, arrivalRateOnChange} : RequestOptionsProps) {
    return (
        <Container>
            {children}
            <Row {...style}>
                <Col>
                    <InputRightDesc description="clients" onChange={clientCntOnChange} value={clientCnt} />
                    <InputRightDesc description="duration" onChange={durationOnChange} value={duration}/>
                    <InputRightDesc description="arrival rate" onChange={arrivalRateOnChange} value={arrivalRate} />
                </Col>
            </Row>
            {/* <Row>
                <Col md={{ span: 4, offset: 6 }}>
                    <OptionButton options={buttonOptions} onChange={(e: buttonChange) => setSelectedServer(e.target.value)} selectedValue={selectedServer} />
                </Col>
            </Row> */}
        </Container>
    )
}