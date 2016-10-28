/* @flow */
/* eslint-env node, mocha */

export function pushNodeNamesTo(result: Array<string>): (node: Node) => void {
	return (node) => { result.push(node.nodeName.toLowerCase()); };
}

export function foo() {}
