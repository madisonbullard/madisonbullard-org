import "./style.css";

import * as paper from "paper";

import { svgString } from "./canvas/assets/madisonbullard.svg";
import { setupPaper } from "./canvas/setupPaper";

const appDiv = document.querySelector<HTMLDivElement>("#app");

setupPaper(appDiv);

const text = paper.project.importSVG(svgString);
text.position = paper.view.center;
