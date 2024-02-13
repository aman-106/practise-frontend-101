/**
 * @param {Node} node
 * @returns {Node}
 */
function invert(node) {
  if (!node) return null;
  [node.left, node.right] = [invert(node.right), invert(node.left)];
  return node;
}
