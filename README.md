# traverse-dom

Simple DOM traversal method with some tolerance for modification of the element tree during traversal.
Intended to be [more performant](http://jsperf.com/testfdgdfgfdgfdgfdgdf/4) than
[NodeIterator](https://developer.mozilla.org/en/docs/Web/API/NodeIterator) (due to lack of setup cost),
but less full-featured.

## Installing traverse-dom

```sh
$ npm install traverse-dom
```

```sh
$ yarn add traverse-dom
```

## Usage

```
import traverse from 'traverse-dom';

traverse(myElement, (child) => { mutateElement(child) });
```

```
import { traverseMap } from 'traverse-dom';

traverseMap(myElement, (child) => child.nodeName);
```

## API

### traverse(element, callback, [shouldRecurse=false])

Goes through all the child elements of the provided element and calls the callback with the current child.
If `shouldRecurse` is `true` does a deep traversal.
If `shouldRecurse` is a function it will be called on each element to provide fine control
over what element's children to traverse.

#### Arguments

`element: Element`: element to traverse children of.

`callback: (child: Element) => void`: Callback to pass each child element.

`shouldRecurse: boolean | (child: Element) => boolean = false`: Set to traverse deeper than immediate children of `element`.

#### Returns

`Element`: Returns the same element the function was called with.



### traverseNodes(node, callback, [shouldRecurse=false])

Same as [traverse](README.md#traverseelement-callback-shouldrecursefalse) but traverses nodes not just elements.

#### Arguments

`node: Node`: node to traverse children of.

`callback: (child: Node) => void`: Callback to pass each child node.

`shouldRecurse: boolean | (child: Node) => boolean = false`: Set to traverse deeper than immediate children of `node`.

#### Returns

`Node`: Returns the same node the function was called with.



### traverseMap

Creates an array of values by running each children of the passed node through the callback.
Callback is invoked with the child node.

#### Arguments

`node: Node`: node to traverse children of.

`callback: (child: Node) => T`: The function invoked per iteration.

`shouldRecurse: boolean | (child: Node) => boolean = false`: Set to traverse deeper than immediate children of `node`.

#### Returns

`Array<T>`: Returns the new mapped array.



### traverseReduce

Reduces the node's children to a value which is the accumulated result of running each node thru
`callback` where each successive invocation is supplied the return value of the previous.

#### Arguments

`node: Node`: node to traverse children of.

`callback: (child: Node) => T`: The function invoked per iteration.

`acc: T`: The initial value.

`shouldRecurse: boolean | (child: Node) => boolean = false`: Set to traverse deeper than immediate children of `node`.

#### Returns

`T`: Returns the accumulated value.

## Contributing to traverse-dom

See the [Contribution guide](CONTRIBUTING.md)

## Credits
Based on [shmuga's npm module boilerplate](https://github.com/Travelport-Ukraine/npm-module-boilerplate)
