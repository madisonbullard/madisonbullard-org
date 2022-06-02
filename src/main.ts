import "./style.css";

import { Composite } from "matter-js";
import * as paper from "paper";

import { pathString } from "./canvas/assets/rubikMonoOne.path";
import { createMatterEngine } from "./canvas/createMatterEngine";
import { createMouseTrackerBody } from "./canvas/createMouseTrackerBody";
import { makeWobbly } from "./canvas/makeWobbly";
import { setupMatter } from "./canvas/setupMatter";
import { setupPaper } from "./canvas/setupPaper";
import { setupScene } from "./canvas/setupScene";
import { styleIteration } from "./canvas/styleIteration";
import { styleScene } from "./canvas/styleScene";
import { getRecursiveIterator } from "./getRecursiveIterator";
const appDiv = document.querySelector<HTMLDivElement>("#app");

setupPaper(appDiv);
const matterDiv = setupMatter(appDiv);
const { render, world } = createMatterEngine(matterDiv);

const { width, height } = paper.view.bounds;
const {
  viewSize: { width: viewWidth },
} = paper.view;

const rect = new paper.Rectangle(
  new paper.Point(0, 0),
  new paper.Point(width, height)
);
rect.center = paper.view.center;

const fullScreenRect = new paper.Path.Rectangle(rect);
const backgroundHexColor = "#FAFFEA";

const text = new paper.CompoundPath(pathString);
text.fillRule = "evenodd";

const hueOffset = 100;
const strokeWidth = 2;
const strokeJoin = "round";

const margin = 32;
const depth = 8;

const renderLoops: (() => void)[] = [];
function renderLoop() {
  renderLoops.forEach((loop) => loop());
  window.requestAnimationFrame(renderLoop);
}

const scene = setupScene(text, fullScreenRect, margin);
const styledScene = styleScene(
  scene,
  backgroundHexColor,
  viewWidth,
  hueOffset,
  strokeWidth,
  strokeJoin
);

const cursorLoop = createMouseTrackerBody(world, render);
renderLoops.push(cursorLoop);

const iterate = getRecursiveIterator<paper.PathItem>((_scene, i) => {
  const copy = _scene.clone();

  const fillVal = 1 - ((i + 1) / depth) * 0.1;
  const alpha = 1;
  const hueAngle = ((i / depth) * 0.4 * 360 + hueOffset) % 360;

  styleIteration(copy, strokeWidth, strokeJoin, fillVal, alpha, hueAngle);

  copy.scale(0.989);

  copy.sendToBack();

  const stiffnessMin = 0.8;
  const stiffnessMax = 1;
  const stiffnessRange = stiffnessMax - stiffnessMin;
  const percentOfTheWayThroughTheLoop = (depth - i) / (depth - 1);
  const { renderLoop, composite } = makeWobbly(copy, {
    stiffness: percentOfTheWayThroughTheLoop * stiffnessRange + stiffnessMin,
    restitution: 0.01,
  });
  renderLoops.push(renderLoop);
  Composite.add(world, composite);

  return copy;
});

iterate(styledScene, depth);

// scene.visible = false;
fullScreenRect.sendToBack();
fullScreenRect.fillColor = new paper.Color(backgroundHexColor);

renderLoop();
