'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = traverse;
exports.traverseNodes = traverseNodes;
exports.traverseMap = traverseMap;
exports.traverseReduce = traverseReduce;
function result(param) {
	return typeof param === 'function' ? param : function () {
		return Boolean(param);
	};
}

function traverse(element, callback) {
	var shouldRecurse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var child = element.children[0];
	var shouldRecurseFn = result(shouldRecurse);

	while (child) {
		if (shouldRecurseFn(element) && element.children.length) {
			traverse(child, callback, shouldRecurse);
		}

		var nextElement = child.nextElementSibling;

		callback(child);
		child = nextElement;
	}

	return element;
}

function traverseNodes(node, callback) {
	var shouldRecurse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var child = node.childNodes[0];
	var shouldRecurseFn = result(shouldRecurse);

	while (child) {
		if (shouldRecurseFn(node) && node.childNodes.length) {
			traverseNodes(child, callback, shouldRecurse);
		}

		var nextNode = child.nextSibling;

		callback(child);
		child = nextNode;
	}

	return node;
}

function traverseMap(node, callback) {
	var shouldRecurse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var res = [];

	traverseNodes(node, function (child) {
		res.push(callback(child));
	}, shouldRecurse);

	return res;
}

function traverseReduce(node, callback, acc) {
	var shouldRecurse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	traverseNodes(node, function (child) {
		callback(acc, child);
	}, shouldRecurse);

	return acc;
}