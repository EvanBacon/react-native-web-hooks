// @ts-ignore
import { findDOMNode } from 'react-dom';

import getNativeNode from './getNode.native';

function getNode(ref) {
  try {
    let node = getNativeNode(ref);
    if (node) node = findDOMNode(node);
    return node;
  } catch (error) {
    console.error(`Couldn't find node`, error, { ref });
    throw new Error('Failed to use pseudo-class hook')
  }
}

export default getNode;
