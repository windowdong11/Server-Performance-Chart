import { Url } from "url"

export const Endpoints  = {
    GraphQL : `http://localhost:${process.env.REACT_APP_GQL_PORT}/graphql`,
    ProtoBuf : `http://localhost:${process.env.REACT_APP_PROTO_PORT}/post`,
    RestAPI : `http://localhost:${process.env.REACT_APP_REST_PORT}/post`,
    MiddleServer : `http://localhost:${process.env.REACT_APP_MIDDLE_SERVER_PORT}`,
}

export enum HttpMethod {
    Post = "POST",
    Get = "GET",
}

export interface MiddleServerData {
    address: string,
    duration: number | string,
    arrivalRate: number | string,
    clientCount: number | string,
}

function fetchAPI<T>(endpoint: string, query : string | MiddleServerData, method: HttpMethod) : Promise<T>{
    return fetch(endpoint, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query)
    })
    .then((res) => {
        return res.json() as Promise<T>
    }
    )
}

export {fetchAPI}