import * as paper from "paper";

export function setupPaper(node: HTMLElement | null) {
  if (!node) {
    throw new Error("No DOM node passed to setupPaper");
  }

  node.innerHTML = /*html*/ `
    <canvas id="canvas" resize></canvas>
  `;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

  if (!canvas) {
    throw new Error('No canvas element with id "canvas" found.');
  }

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.filter = "blur(20px)";
  }

  paper.setup(canvas);
}
