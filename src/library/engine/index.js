import engineConfig from 'configs/engine';
import { resolveModule } from 'library/utilities';

export default class Engine {
  constructor(config) {
    this.config = config;
  }
  start() {
    const EngineAdapter = resolveModule(require(`./adapter/${engineConfig.default}`));
    const engine = new EngineAdapter(this.config);
    engine.start();
    this.engine = engine;
  }
  addRoute(routeConfig) {
    this.engine.addRoute(routeConfig);
    return this;
  }
}
