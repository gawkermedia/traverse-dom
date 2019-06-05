#!/bin/sh -e

./node_modules/.bin/babel src --out-dir ./
cp src/traverse-dom.js traverse-dom.js.flow
