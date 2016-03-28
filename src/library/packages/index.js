import pathConfig from 'configs/paths';
import log from 'library/log';
import { resolveModule } from 'library/utilities';
import { readdirAsync, readdirSync } from 'fs-extra-promise';
import { parse as parseFile } from 'path';

export default class PackageLoader {
  start() {
    return this.loadPackages();
  }
  loadPackages() {
    // load all active packages
    return readdirAsync(pathConfig.package)
    .then(folders => {
      let packages = folders.map(folder => {
        const packagePath = `${pathConfig.package}/${folder}`;
        const packageConfig = require(`${packagePath}/package.json`);
        packageConfig.path = packagePath;
        return packageConfig;
      });

      // remove disabled package
      packages = packages.filter(packageConfig => {
        if (typeof packageConfig.enable === 'undefined') {
          return true;
        }

        return packageConfig.enable;
      });

      packages = packages.map(packageConfig => {
        packageConfig = Object.assign(packageConfig, this.loadPackageConfig(packageConfig));
        packageConfig = Object.assign(packageConfig, this.routeBuilder(packageConfig));
        return packageConfig;
      });

      return packages;
    });
  }
  loadPackageConfig(packageConfig) {
    let additionalConfig;
    if (packageConfig.configuration) {
      additionalConfig = this.loadPackageHookConfiguration(packageConfig);
    } else {
      additionalConfig = this.loadPackageHookConvention(packageConfig);
    }

    return additionalConfig;
  }
  loadPackageHookConfiguration() {}
  loadPackageHookConvention(packageConfig) {
    const files = readdirSync(`${packageConfig.path}/configs`);
    const hooks = {};

    files.map(file => {
      const { name } = parseFile(file);

      hooks[name] = resolveModule(require(`${packageConfig.path}/configs/${file}`));

      return file;
    });

    return { hooks };
  }
  routeBuilder(packageConfig) {
    if (!packageConfig.hooks) { return {}; }

    const hooks = packageConfig.hooks;
    let routeHooks = hooks.routes;

    if (routeHooks) {
      routeHooks = routeHooks.map(route => {
        route.handler = `${packageConfig.path}/${route.handler}`;

        return route;
      });
    }

    return { hooks: { routes: routeHooks } };
  }
}
