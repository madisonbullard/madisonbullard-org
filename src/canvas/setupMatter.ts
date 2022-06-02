const NODE_ID = "matter";

export function setupMatter(node: HTMLElement | null) {
  if (!node) {
    throw new Error("No DOM node passed to setupMatter");
  }

  const divNode = document.createElement("div");
  divNode.setAttribute("id", NODE_ID);
  node.appendChild(divNode);

  const div = document.getElementById(NODE_ID) as HTMLDivElement | null;

  if (!div) {
    throw new Error('No canvas element with id "matter" found.');
  }

  return divNode;
}
