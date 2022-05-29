import "./style.css";

import setupPaper from "./canvas/setupPaper";
import metaball from "./canvas/metaball";
import * as paper from "paper";
import svg from "./canvas/madisonbullard.svg";
import getGridPointsWithinItem from "./utils/getGridPointsWithinItem";

const app = document.querySelector<HTMLDivElement>("#app");

setupPaper(app);

const text = paper.project.importSVG(svg);
text.position = new paper.Point(400, 400);

const points = getGridPointsWithinItem(text, 9);

metaball(points, {
  radius: 2,
  handleLengthRate: 0.4,
  v: 2,
  maxDistance: 2,
});

text.visible = false;
