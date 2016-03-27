import Hapi from 'hapi';
import pathConfig from 'configs/paths';

const AVAILABLE_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export default class HapiEngine {
  constructor(config) {
    this.config = config;
  }
  start() {
    console.log('Starting Hapi Engine');
    this.server = new Hapi.Server();
    this.server.connection({
      host: this.config.host,
      port: this.config.port,
    });

    this.server.start(err => {
      if (err) {
        throw new Error(err);
      }

      console.log(`Hapi Engine started at: ${this.server.info.uri}`);
    });
  }
  /**
   * add new route to engine
   * @param {{methods:(String|String[]), path:String, handler:(String|Function)}} routeConfig
   * @returns {void}
   */
  addRoute(routeConfig) {
    if (routeConfig.methods === '*') { routeConfig.methods = AVAILABLE_METHODS; }

    const [handlerPath, methodName] = routeConfig.handler.split('@');
    const handler = require(handlerPath);

    this.server.route({
      method: routeConfig.methods,
      path: routeConfig.path,
      handler: (request, reply) => {
        const action = handler[methodName]();

        if (action.then && typeof action.then === 'function') { // return Promise
          action.then(result => reply(result));
        } else {
          reply(action);
        }
      },
    });
  }
}
