import * as paper from "paper";

function setupPaper(node: HTMLElement | null) {
  if (!node) {
    throw new Error("No DOM node passed to setupPaper");
  }

  node.innerHTML = /*html*/ `
    <canvas id="canvas"></canvas>
  `;

  paper.setup("canvas");
}

export default setupPaper;
