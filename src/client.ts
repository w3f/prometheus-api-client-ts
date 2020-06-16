import { Logger, createLogger } from '@w3f/logger';
import got from 'got';

import {
    PrometheusAPIClientInterface,
    RequestHeaders,
    InstantResponse,
    RangeResponse,
    PrometheusClientConfig,
    InstantQueryInput,
    RangeQueryInput
} from './types';

export class PrometheusAPIClient implements PrometheusAPIClientInterface {
    private readonly url: string;
    private readonly headers: RequestHeaders;
    private readonly logger: Logger;

    constructor(cfg: PrometheusClientConfig) {
        this.url = `${cfg.url}/api/v1`;
        this.headers = cfg.headers;
        if (!cfg.logger) {
            this.logger = createLogger();
        } else {
            this.logger = cfg.logger;
        }
    }

    async instantQuery(input: InstantQueryInput): Promise<InstantResponse> {
        let url = `${this.url}/query?query=${input.query}`;
        if (input.time) {
            url += `&time=${input.time}`;
        }
        if (input.timeout) {
            url += `&timeout=${input.timeout}`;
        }

        return this.query<InstantResponse>(url);
    }

    async rangeQuery(input: RangeQueryInput): Promise<RangeResponse> {
        let url = `${this.url}/query_range?query=${input.query}&start=${input.start}&end=${input.end}&step=${input.step}`;
        if (input.timeout) {
            url += `&timeout=${input.timeout}`;
        }

        return this.query<RangeResponse>(url);
    }

    private async query<T>(url: string): Promise<T> {
        this.logger.debug(`Sending query to ${url}`);

        try {
            const body = await got(url, { headers: this.headers }).json();
            return body as T;
        } catch (e) {
            this.logger.error(`body: ${JSON.stringify(e.response.body)}`);
            throw new Error(e);
        }
    }
}
