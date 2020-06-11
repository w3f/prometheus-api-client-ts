import { Logger } from '@w3f/logger';


export class PrometheusClient {
    constructor(
        private readonly url: string,
        private readonly logger: Logger) { }
}
