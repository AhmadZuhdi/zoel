import serverConfig from 'configs/server';

const ENGINE = Symbol('Engine');
const STARTED_ENGINE = Symbol('StartedEngine');

export default class Server {
  constructor(Engine) {
    this[ENGINE] = Engine;
    this[STARTED_ENGINE] = [];
  }
  start() {
    serverConfig.map(config => {
      const engine = new this[ENGINE](config);
      engine.start();
      this[STARTED_ENGINE].push(engine);
      return config;
    });
  }
  addRoute(...args) {
    if (this[STARTED_ENGINE].length === 0) {
      throw new Error('Cannot add new route, Server is not Started Yet!');
    }

    this[STARTED_ENGINE].map(engine => engine.addRoute(...args));
  }
}
