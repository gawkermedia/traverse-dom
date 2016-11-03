/* globals Element */

import $ from 'jquery';
import assert from 'assert';

import { traverse, traverseReduce } from '../dist/traverse-dom';

const originalDOM = $(`
<div id="blockquote-clean">
<blockquote>
	<p>paragraph <strong>inside</strong> the blockquote</p>
	<figure><img src=""></figure>
</blockquote>
<blockquote>
	<p>paragraph <strong>inside</strong> the blockquote</p>
	<table><tr><th>Kinja</th></tr></figure>
</blockquote>
</div>
`).get(0);

const mutatedDOM = originalDOM.cloneNode(true);

// Move blacklisted elements after the blockquote
traverse(mutatedDOM, (element) => {
	if (element.nodeName === 'BLOCKQUOTE') {
		const blacklist = element.querySelectorAll('figure, table');

		for (let i = blacklist.length - 1; i >= 0; i -= 1) {
			const parent = element.parentElement;
			if (parent) {
				parent.insertBefore(blacklist[i], element.nextSibling);
			}
		}
	}
});

// Collect all the node names of the top level elements
const nodeNames = traverseReduce(mutatedDOM, (memo, node) => {
	if (node instanceof Element) {
		memo.push(node.nodeName);
	}
	return memo;
}, [], false);


describe('example: BLOCKQUOTE', () => {
	it('should move blacklisted elements after the blockquote', () => {
		assert.equal(
			nodeNames.toString(),
			'BLOCKQUOTE,FIGURE,BLOCKQUOTE,TABLE'
		);
	});
});
