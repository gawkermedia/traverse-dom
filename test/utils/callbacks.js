/* @flow */
/* eslint-env node, mocha */

export function getNodeName(node: Node): string { return node.nodeName.toLowerCase(); }

export function pushNodeNamesTo(result: Array<string>): (node: Node) => void {
	return (node) => { result.push(getNodeName(node)); };
}
