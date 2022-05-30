import "./style.css";

import * as paper from "paper";

import { svgString } from "./canvas/assets/madisonbullard.svg";
import { renderSvgString } from "./canvas/renderSvgString";
import { setupPaper } from "./canvas/setupPaper";

const appDiv = document.querySelector<HTMLDivElement>("#app");

setupPaper(appDiv);

const text = renderSvgString(svgString);
text.position = paper.view.center;
