import "./style.css";

import * as paper from "paper";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No #app element found");
}

app.innerHTML = /*html*/ `
  <canvas id="canvas"></canvas>
`;

paper.setup("canvas");

new paper.Path.Circle({
  center: paper.view.center,
  radius: 50,
  fillColor: "orange",
});
