const debug = require('debug')('app:QueueService');
const QueueUtils = require('../utils/queue.utils');

class QueueService {
  constructor() {
    this.queueUtils = new QueueUtils();
  }

  async init() {
    try {
      await this.queueUtils.run();
      this.subscribeToJobsQueue();
    } catch (e) {
      throw new Error(e);
    }
  }

  subscribeToJobsQueue() {
    this.queueUtils.subscribeToJobsQueue((data) => {
      debug('subscribeToJobsQueue', QueueService.parseBuffer(data));
    });
  }

  publishToJobsQueue(data) {
    this.queueUtils.publishToJobsQueue(data);
    debug('publishToJobsQueue with data:', data);
  }

  static logEvent(name, data) {
    debug(`received event ${name} with data:`, data);
  }

  static parseBuffer(data) {
    return JSON.parse(data.content);
  }
}

module.exports = QueueService;
