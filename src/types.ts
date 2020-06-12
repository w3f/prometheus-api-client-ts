import { Logger } from '@w3f/logger';


export type Status = 'success' | 'error';

export type ResultType = 'matrix' | 'vector' | 'scalar' | 'string';

export type MetricField = '__name__' | 'job' | 'instance';

export type Metric = {
    [field in MetricField]: string;
}

export type Value = [number, string];

export interface ResultItem {
    metric: Metric;
    value?: Value;
    values?: Array<Value>;
}

export interface Data {
    resultType: ResultType;
    result: Array<ResultItem>;
}

export interface Response {
    status: Status;
    data: Data;

    errorType?: string;
    error?: string;
    warnings?: Array<string>;
}

export interface PrometheusAPIClientInterface {
    instantQuery(): Promise<Response>
}


export interface RequestHeaders {
    [key: string]: string;
}

export interface PrometheusClientConfig {
    url: string;
    headers?: RequestHeaders;
    logger?: Logger;
}
