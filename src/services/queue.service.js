const debug = require('debug')('app:QueueService');
const QueueUtils = require('../utils/queue.utils');

class QueueService {
  constructor() {
    this.queueUtils = new QueueUtils();
  }

  async init(callback) {
    try {
      await this.queueUtils.run();
      if (typeof callback === 'function') {
        callback();
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  subscribeToJobsQueue(personsCleanupCallback) {
    this.queueUtils.subscribeToJobsQueue((data) => {
      const jobData = QueueService.parseBuffer(data);
      debug('subscribeToJobsQueue', jobData);

      switch (jobData.action) {
        case 'personsCleanupJob':
          if (typeof personsCleanupCallback === 'function') {
            personsCleanupCallback(jobData);
          }
          break;
        default:
          break;
      }
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
