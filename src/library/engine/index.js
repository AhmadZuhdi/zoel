import engineConfig from './../../configs/engine';
import { resolveModule } from './../utilities';

export default class Engine {
  constructor(config) {
    this.config = config;
  }
  start() {
    const EngineAdapter = resolveModule(require(`./adapter/${engineConfig.default}`));
    const adapter = new EngineAdapter(this.config);
    adapter.start();
  }
}
