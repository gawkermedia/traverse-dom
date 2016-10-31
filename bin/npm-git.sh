#!/bin/sh -e

# This script maintains a git branch which mirrors master but in a form that
# what will eventually be deployed to npm, allowing npm dependencies to use:
#
#     "traverse-dom": "git://github.com/gawkermedia/traverse-dom.git#npm"
#

./node_modules/.bin/babel src --out-dir npm
cp src/traverse-dom.js npm/traverse-dom.js.flow

# Ensure a vanilla package.json before deploying so other tools do not interpret
# The built output as requiring any further transformation.
node -e "var package = require('./package.json'); \
  delete package.scripts; \
  delete package.devDependencies; \
  require('fs').writeFileSync('./npm/package.json', JSON.stringify(package, null, 2));"

cp README.md npm/
cp LICENSE npm/

cd npm
git init
git add .
git commit -m "Deploy master to NPM branch"
git push --force --quiet master:npm
