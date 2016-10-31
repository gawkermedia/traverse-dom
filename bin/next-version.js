/**
 * Create the commit and tag for the next release.
 *
 * npm run next-version.js [major | minor | patch | premajor | preminor | prepatch | prerelease]
 */

const exec = require('child_process').exec;
const packageJSON = require('../package.json');
const fs = require('fs');


const versions = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'];

const releaseType = process.argv.slice(2, 3)[0];

if (versions.indexOf(releaseType) < 0) {
	throw new Error(`Invalid parameter "${releaseType}"
	Usage: node next-version.js [${versions.join(' | ')}]`);
}

// Bump to next version.
const version = packageJSON.version;
const nextVersion = require('semver').inc(version, releaseType);

packageJSON.version = nextVersion;

const newJSON = JSON.stringify(packageJSON, null, 2);
fs.writeFileSync('./package.json', newJSON);

// Commit and create tag.
const gitCommands = [
	'git add package.json dist/',
	`git commit -m "release ${nextVersion}"`,
	`git tag ${nextVersion} -m "release ${nextVersion}"`,
];

exec(gitCommands.join(' && '), (error, stdout, stderr) => {
	console.log(stdout);
	console.error(stderr);
	if (error) {
		throw new Error(error);
	}
});
