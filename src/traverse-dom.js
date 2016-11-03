/* @flow */

function result<T>(param: (boolean | (t: T) => boolean)): (t: T) => boolean {
	return (typeof param === 'function') ? param : () => Boolean(param);
}

export function traverse(
	element: Element,
	callback: (child: Element) => void,
	shouldRecurse: boolean | (child: Element) => boolean = false,
): Element {
	let child = element.children[0];
	const shouldRecurseFn = result(shouldRecurse);

	while (child) {
		if (shouldRecurseFn(element) && element.children.length) {
			traverse(child, callback, shouldRecurse);
		}

		const nextElement = child.nextElementSibling;

		callback(child);
		child = nextElement;
	}

	return element;
}

export function traverseNodes(
	node: Node,
	callback: (child: Node) => void,
	shouldRecurse: boolean | (child: Node) => boolean = false,
): Node {
	let child = node.childNodes[0];
	const shouldRecurseFn = result(shouldRecurse);

	while (child) {
		if (shouldRecurseFn(node) && node.childNodes.length) {
			traverseNodes(child, callback, shouldRecurse);
		}

		const nextNode = child.nextSibling;

		callback(child);
		child = nextNode;
	}

	return node;
}

export function traverseMap<T>(
	node: Node,
	callback: (child: Node) => T,
	shouldRecurse: boolean | (child: Node) => boolean = false,
): Array<T> {
	const res = [];

	traverseNodes(node, (child) => {
		res.push(callback(child));
	}, shouldRecurse);

	return res;
}

export function traverseReduce<T>(
	node: Node,
	callback: (acc: T, child: Node) => T,
	acc: T,
	shouldRecurse: boolean | (child: Node) => boolean = false,
): T {
	traverseNodes(node, (child) => {
		callback(acc, child);
	}, shouldRecurse);

	return acc;
}
