import { Logger, createLogger } from '@w3f/logger';

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
        this.url = cfg.url;
        this.headers = cfg.headers;
        if (!cfg.logger) {
            this.logger = createLogger();
        } else {
            this.logger = cfg.logger;
        }
    }

    async instantQuery(input: InstantQueryInput): Promise<InstantResponse> {
        return
    }
    async rangeQuery(input: RangeQueryInput): Promise<RangeResponse> {
        return
    }
}
