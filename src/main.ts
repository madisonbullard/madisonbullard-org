import "./style.css";

import setupPaper from "./canvas/setupPaper";
import metaball from "./canvas/metaball";
import * as paper from "paper";
import svg from "./canvas/madisonbullard.svg";
import getGridPointsWithinItem from "./utils/getGridPointsWithinItem";

const app = document.querySelector<HTMLDivElement>("#app");

setupPaper(app);

metaball();

const text = paper.project.importSVG(svg);
text.position = new paper.Point(400, 400);
const points = getGridPointsWithinItem(text, 4);

points.forEach((point) => {
  new paper.Path.Circle({
    center: [point.x, point.y],
    radius: 1,
    fillColor: new paper.Color(255, 255, 0),
  });
});

text.visible = false;
