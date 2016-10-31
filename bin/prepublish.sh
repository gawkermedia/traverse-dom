#!/bin/sh -e

# Because of a long-running npm issue (https://github.com/npm/npm/issues/3059)
# prepublish runs after `npm install` and `npm pack`.
# In order to only run prepublish before `npm publish`, we have to check argv.
if node -e "process.exit(($npm_config_argv).original[0].indexOf('pu') === 0)"; then
  exit 0;
fi

./node_modules/.bin/babel src --out-dir ./
cp src/traverse-dom.js traverse-dom.js.flow

# Ensure a vanilla package.json before deploying so other tools do not interpret
# The built output as requiring any further transformation.
node -e "var package = require('./package.json'); \
  delete package.scripts; \
  delete package.devDependencies; \
  require('fs').writeFileSync('package.json', JSON.stringify(package, null, 2));"
