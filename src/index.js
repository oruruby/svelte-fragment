export default function fragment(node) {
  const parent = node.parentElement;
  const children = Array.prototype.slice.call(
    (node.content || node).childNodes,
  );
  if (!node.content || node.content.nodeType !== 11) {
    node.content = document.createDocumentFragment();
    for (let i in children) {
      node.content.appendChild(children[i]);
    }
  }
  parent.appendChild(node.content);
  document.createDocumentFragment().appendChild(document.adoptNode(node));
  return {
    destroy() {
     requestAnimationFrame(function() {
        for (let i in children) {
          if (parent && parent.contains(children[i])) {
            parent.removeChild(children[i]);
          }
        }
      });
    },
  };
}
