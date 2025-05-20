import Queue from 'bull';
import { processPayment } from './worker.js';

const paymentQueue = new Queue('paymentQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  }
});

paymentQueue.process(processPayment);

export default paymentQueue;
