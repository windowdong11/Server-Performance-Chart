import { Url } from "url"

export const Endpoints  = {
    GraphQL : `http://localhost:${process.env.REACT_APP_GQL_PORT}/graphql`,
    ProtoBuf : `http://localhost:${process.env.REACT_APP_PROTO_PORT}/`,
    RestAPI : `http://localhost:${process.env.REACT_APP_REST_PORT}/`,
    MiddleServer : `http://localhost:${process.env.REACT_APP_MIDDLE_SERVER_PORT}/`,
}

export enum HttpMethod {
    Post = "POST",
    Get = "GET",
}

export interface MiddleServerData {
    address: string,
    duration: number,
    arrivalRate: number,
    clientCount: number,
}

async function fetchAPI(endpoint: string, query : string, method: HttpMethod) {
    const response = await fetch(endpoint, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    })
    return response
}

export {fetchAPI}