/* eslint-disable no-unused-vars */

class Service {
  constructor ({client}) {
    this.client = client;
    this.keywords = [];
    this.started = false;
  }

  _start() {
    const track = this.keywords;
    if (this.started || !track.length) return;

    console.log('STARTING!', track);

    this.client.stream('statuses/filter', {track});
    this.started = true;
    this._monitor();
  }

  _stop() {
    if (!this.started) return;
    this.client.close();
    this.started = false;
  }

  _restart() {
    if (!this.started) return;
    this._stop();
    this._start();
  }

  _monitor() {
    this.client.on('connection success', uri => console.log('connection success', uri));
    this.client.on('connection aborted', () => console.log('connection aborted'));
    this.client.on('connection error network', error => console.log('connection error network', error));
    this.client.on('connection error stall', () => console.log('connection error stall'));
    this.client.on('close', () => console.log('connection closed'));
    this.client.on('connection error http', httpStatusCode => console.log('connection error http', httpStatusCode));
    this.client.on('connection rate limit', httpStatusCode => console.log('connection rate limit', httpStatusCode));
    this.client.on('connection error unknown', error => {
      console.log('connection error unknown', error);
      this._stop();
    });

    this.client.on('data keep-alive', () => console.log('data keep-alive'));
    this.client.on('data error', (error) => console.log('data error', error));
  }

  async find() {
    return this.keywords;
  }

  async create(data) {
    if (!Array.isArray(data)) data = data.split(',').map(str => str.trim());
    this.keywords = data;

    if (this.started) {
      this._restart();
    } else this._start();

    return this.keywords;
  }
}

export default options => new Service(options);
export {Service};
