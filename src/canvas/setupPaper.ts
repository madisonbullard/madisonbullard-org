import * as paper from "paper";

export function setupPaper(node: HTMLElement | null) {
  if (!node) {
    throw new Error("No DOM node passed to setupPaper");
  }

  node.innerHTML = /*html*/ `
    <canvas id="canvas" resize></canvas>
  `;

  paper.setup("canvas");
}
