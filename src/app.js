import Server from 'library/server';
import Engine from 'library/engine';
import PackageLoader from 'library/packages';
import log from 'library/log';

// initialize server
const server = new Server(Engine);

// starting server
server.start();

const packageLoader = new PackageLoader();

packageLoader.start()
.then(packages => {
  packages.map(packageConfig => {
    if (packageConfig.hooks) { // check if package have need hooks
      if (packageConfig.hooks.routes) { // check if package have hook for route
        packageConfig.hooks.routes.map(route => server.addRoute(route));
      }
    }

    return packageConfig;
  });
});

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
  if (err) log(err.stack);
  if (options.exit) process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
