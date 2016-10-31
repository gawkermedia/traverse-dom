# CONTRIBUTING

Contributions are always welcome, no matter how large or small.

## Setup

```sh
$ git clone
$ cd traverse
$ yarn
```

## Building

```sh
$ npm run build
```

## Testing

```sh
$ npm run test
```

```sh
$ npm run lint
```

## Pull Requests

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

## Create new release

To create a new tagged release and push to git run
```sh
$ npm run release [releaseType]
```
Where releaseType is one of these semver releases `[major | minor | patch | premajor | preminor | prepatch | prerelease]`

Before publishing to npm be sure to run the release script on master,
then create the npm branch by running:
```sh
$ ./bin/npm-git
```
This will create a mirror from master but in a form that it will eventually be deployed to npm.
Now you can publish to npm.

## License

By contributing, you agree that your contributions will be licensed
under its [MIT License](LICENSE).
