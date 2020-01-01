function getNode(ref) {
  try {
    let node = ref && (ref.current || ref);

    if (node && node.getNode && node.getNode()) node = node.getNode();

    if (node && node._touchableNode) node = node._touchableNode;

    if (node && node._node) node = node._node;

    return node;
  } catch (error) {
    console.error('Failed to find node', error, { ref });
    return null;
  }
}

export default getNode;
