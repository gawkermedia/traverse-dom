/* @flow */
/* eslint-env node, mocha */

import $ from 'jquery';
import assert from 'assert';

import { pushNodeNamesTo, getNodeName } from './utils/callbacks';

import {
	traverse,
	traverseNodes,
	traverseMap,
} from '../src/traverse-dom';

const simpleHtml = $(require('./fixtures/simple.html')).get(0);
const simpleDeepHtml = $(require('./fixtures/simpleDeep.html')).get(0);
const deepHtml = $(require('./fixtures/deep.html')).get(0);

describe('DOM traversal', () => {
	let deepHtmlResult;

	beforeEach(() => {
		deepHtmlResult = ['strong', 'span', 'p', 'strong', 'span', 'p', 'div', 'strong', 'span', 'p', 'div'];
	});

	describe('API consistency', () => {
		describe('of traverse', () => {
			it('should not recurse, and find elements only', () => {
				const result = [];
				const dom = $('<div><p><span><i></i></span></p>text<p></p></div>').get(0);

				traverse(dom, pushNodeNamesTo(result));
				assert.deepEqual(result, ['p', 'p']);
			});

			it('should not recurse when shouldRecurse = false', () => {
				const result = [];

				traverse(simpleDeepHtml, pushNodeNamesTo(result), false);
				assert.deepEqual(result, ['div']);
			});

			it('should not recurse when shouldRecurse = () => false', () => {
				const result = [];

				traverse(simpleDeepHtml, pushNodeNamesTo(result), () => false);
				assert.deepEqual(result, ['div']);
			});

			describe('traverseNodes', () => {
				it('should not recurse, and find elements and nodes', () => {
					const result = [];

					traverseNodes(simpleHtml, pushNodeNamesTo(result));
					assert.deepEqual(result, ['p', '#text', 'p']);
				});
			});
		});
	});

	describe('traversing', () => {
		it('should recurse and traverse, touching every element', () => {
			const result = [];
			traverse(deepHtml, pushNodeNamesTo(result), true);
			assert.deepEqual(result, deepHtmlResult);
		});

		it('should recurse and traverse, touching every element', () => {
			const result = [];
			traverse(deepHtml, pushNodeNamesTo(result), () => true);
			assert.deepEqual(result, deepHtmlResult);
		});

		it('traverse should skip children of a specified element', () => {
			const html = $('<div><p><i>foo</i></p><p class="skip"><i>bar</i></p><p><i>bat</i></p></div>').get(0);
			// Adds a the .touched className to every <i> element.
			const touchItalic = (child) => {
				if (child.nodeName === 'I') {
					child.classList.add('touched');
				}
			};

			// Skip children of the element with the .skip className
			traverse(html, touchItalic, child => !child.classList.contains('skip'));

			assert.equal(html.querySelectorAll('.touched').length, 2);
		});
	});

	describe('utilities', () => {
		describe('map', () => {
			it('should transform all top level nodes', () => {
				assert.deepEqual(
					traverseMap(simpleHtml, getNodeName),
					['p', '#text', 'p']
				);
			});

			it('should transform all nodes except the ones it should skip', () => {
				assert.deepEqual(
					traverseMap(simpleDeepHtml, getNodeName, child => getNodeName(child) !== 'span'),
					['span', 'p', 'div']
				);
			});
		});
		describe('reduce', () => {});
	});
});
