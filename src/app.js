import Server from 'library/server';
import Engine from 'library/engine';
import PackageLoader from 'library/packages';

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
