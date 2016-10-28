## flow-typed

The definitions under the `npm` folder here are pulled down from
[`flow-typed`](https://github.com/flowtype/flow-typed). Please do not change these files directly.

### Updating these definitions

1. Put up a pull request on [`flow-typed`](https://github.com/flowtype/flow-typed) with the proposed changes. Include tests.
2. Once it's merged, update the files here
  - `npm install -g flow-typed`
  - `flow-typed install packageName -f flowVersion -o`, where:
    - `packageName` is the name of the package (e.g. `mocha@2.4.0`)
    - `flowVersion` is the Flow version we are currently using e.g. `0.33.0`
    - `-o` just indicates the the existing defs should be overwritten
