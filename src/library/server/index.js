import serverConfig from './../../configs/server';

const ENGINE = Symbol('Engine');
const STARTED_ENGINE = Symbol('StartedEngine');

export default class Server {
  constructor(Engine) {
    this[ENGINE] = Engine;
    this[STARTED_ENGINE] = {};
  }
  start() {
    serverConfig.map(config => {
      const engine = new this[ENGINE](config);
      engine.start();
      return config;
    });
  }
}
