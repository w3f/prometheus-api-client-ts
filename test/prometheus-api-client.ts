import { should } from 'chai';
import { createLogger } from '@w3f/logger';

import { PrometheusClient } from '../src/index';

should();

const logger = createLogger();
const url = 'http://prometheus:9090';

const subject = new PrometheusClient(url, logger);

describe('Prometheus API Client', () => {
    it('should retrieve metrics');
});
