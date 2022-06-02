import * as paper from "paper";

const CANVAS_ID = "paper";

export function setupPaper(node: HTMLElement | null) {
  if (!node) {
    throw new Error("No DOM node passed to setupPaper");
  }

  const canvasNode = document.createElement("canvas");
  canvasNode.setAttribute("id", CANVAS_ID);
  canvasNode.setAttribute("resize", "true");
  canvasNode.setAttribute("class", "paper");
  node.appendChild(canvasNode);

  const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement | null;

  if (!canvas) {
    throw new Error('No canvas element with id "canvas" found.');
  }

  paper.setup(canvas);
}
