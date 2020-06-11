import { Logger } from '@w3f/logger';


export interface RequestHeaders {
    [key: string]: string;
}

export interface PrometheusClientConfig {
    url: string;
    headers?: RequestHeaders;
    logger?: Logger;
}
