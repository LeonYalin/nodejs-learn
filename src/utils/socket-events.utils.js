const debug = require('debug')('app:SocketEventsUtils');

class SocketEventsUtils {
  constructor() {
    this.events = [
      { name: 'runPersonsCleanupJob', callback: SocketEventsUtils.runPersonsCleanupJob },
      { name: 'helloFromClientSize', callback: SocketEventsUtils.helloFromClientSize },
    ];
  }

  static runPersonsCleanupJob(data) {
    SocketEventsUtils.logEvent('runPersonsCleanupJob', data);
  }

  static helloFromClientSize(data) {
    SocketEventsUtils.logEvent('helloFromClientSize', data);
  }

  static logEvent(name, data) {
    debug(`received event ${name} with data:`, data);
  }
}

module.exports = SocketEventsUtils;
