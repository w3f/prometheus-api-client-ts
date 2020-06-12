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

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Prometheus API Client', () => {
    before(async () => {
        // give prometheus some time to get metrics
        await delay(6000);
    });

    it('should retrieve instant metrics', async () => {
        const input = { query };

        const result = await subject.instantQuery(input);

        result.status.should.eq('success');
        result.data.resultType.should.eq('vector');
        result.data.result.length.should.gt(0);
        result.data.result.forEach((item) => {
            item.metric['__name__'].should.eq(query);
            item.metric['instance'].should.eq('localhost:9090');
            item.metric['job'].should.eq('prometheus');
            item.value[1].should.eq('1');
        });
    });

    it('should retrieve range metrics', async () => {
        const start = moment().utc().startOf('hour').format();
        const end = moment().utc().format();
        const step = '1s';

        const input = { query, start, end, step };

        const result = await subject.rangeQuery(input);

        result.status.should.eq('success');
        result.data.resultType.should.eq('matrix');
        result.data.result.length.should.gt(0);
        result.data.result.forEach((item) => {
            item.metric['__name__'].should.eq(query);
            item.metric['instance'].should.eq('localhost:9090');
            item.metric['job'].should.eq('prometheus');
            item.values.length.should.gt(0);
            item.values.forEach((value) => {
                value[1].should.eq('1');
            });
        });
    });
});
