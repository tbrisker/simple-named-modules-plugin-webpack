"use strict";

class SimpleNamedModulesPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("before-module-ids", (modules) => {
        modules.forEach((module) => {
          if(module.id === null && module.libIdent) {
            module.id = module.libIdent({
              context: this.options.context || compiler.options.context
            });
            if (module.id.includes('node_modules')) {
              module.id = module.id.slice(module.id.indexOf('node_modules'))
            }
          }
        });
      });
    });
  }
}

module.exports = SimpleNamedModulesPlugin;
