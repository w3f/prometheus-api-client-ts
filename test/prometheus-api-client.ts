import { should } from 'chai';
import { createLogger } from '@w3f/logger';

import { PrometheusAPIClient } from '../src/index';

should();

const logger = createLogger('debug');
const url = 'http://prometheus:9090';

const cfg = { url, logger };
const subject = new PrometheusAPIClient(cfg);

describe('Prometheus API Client', () => {
    it('should retrieve instant metrics', async () => {
        const query = 'up'
        const input = { query };

        const result = await subject.instantQuery(input);

        result.status.should.eq('success');
        result.data.resultType.should.eq('vector');
    });
});
