import * as paper from "paper";

const CANVAS_ID = "paper";

export function setupPaper(node: HTMLElement | null, width: number) {
  if (!node) {
    throw new Error("No DOM node passed to setupPaper");
  }

  const canvasNode = document.createElement("canvas");
  const finalWidth = Math.min(node.offsetWidth, width);
  const height = Math.min(node.offsetHeight, width);
  canvasNode.setAttribute("id", CANVAS_ID);
  canvasNode.setAttribute("width", `${finalWidth}px`);
  canvasNode.setAttribute("height", `${height}px`);

  paper.setup(canvasNode);
  node.appendChild(canvasNode);
}
