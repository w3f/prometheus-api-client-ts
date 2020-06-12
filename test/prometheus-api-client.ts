import { should } from 'chai';
import { createLogger } from '@w3f/logger';
import moment = require('moment');

import { PrometheusAPIClient } from '../src/index';

should();

const logger = createLogger('debug');
const url = 'http://prometheus:9090';

const cfg = { url, logger };
const subject = new PrometheusAPIClient(cfg);
const query = 'up';

describe('Prometheus API Client', () => {
    it('should retrieve instant metrics', async () => {
        const input = { query };

        const result = await subject.instantQuery(input);

        result.status.should.eq('success');
        result.data.resultType.should.eq('vector');
    });

    it('should retrieve range metrics', async () => {
        const start = moment().utc().startOf('hour').format();
        const end = moment().utc().format();
        const step = '15s';

        const input = { query, start, end, step };

        const result = await subject.rangeQuery(input);

        result.status.should.eq('success');
        result.data.resultType.should.eq('matrix');
    });
});
