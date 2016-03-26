import Hapi from 'hapi';

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

      console.log(`Hapi Engine starten at: ${this.server.info.uri}`);
    });
  }
}
