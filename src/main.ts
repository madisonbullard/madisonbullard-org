import "./style.css";

import metaball from "./canvas/metaball";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No #app element found");
}

app.innerHTML = /*html*/ `
  <canvas id="canvas"></canvas>
`;

metaball("canvas");
