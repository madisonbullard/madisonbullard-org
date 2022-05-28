import metaball from "./metaball";

function setupCanvas(node: HTMLElement | null) {
  if (!node) {
    throw new Error("No DOM node passed to setupCanvas");
  }

  node.innerHTML = /*html*/ `
    <canvas id="canvas"></canvas>
  `;

  metaball("canvas");
}

export default setupCanvas;
