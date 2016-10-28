/**
 * Make the "Required module not found" module go away.
 * I couldn't find any better working solution to this problem :(
 *
 * test/index.js:15
 *  15: const deepHtml = $(require('./fixtures/deep.html')).get(0);
 *                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ./fixtures/deep.html. Required module not found
 */
declare module './fixtures/simple.html' {}
declare module './fixtures/simpleDeep.html' {}
declare module './fixtures/deep.html' {}
