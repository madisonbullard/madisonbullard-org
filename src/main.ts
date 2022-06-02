import "./style.css";

import { Composite } from "matter-js";
import * as paper from "paper";

import { pathString } from "./canvas/assets/madisonbullard.path";
import { createMatterEngine } from "./canvas/createMatterEngine";
import { createMouseTrackerBody } from "./canvas/createMouseTrackerBody";
import { makeWobbly } from "./canvas/makeWobbly";
import { setupMatter } from "./canvas/setupMatter";
import { setupPaper } from "./canvas/setupPaper";
import { getRecursiveIterator } from "./getRecursiveIterator";
const appDiv = document.querySelector<HTMLDivElement>("#app");

setupPaper(appDiv);
const matterDiv = setupMatter(appDiv);
const { render, world } = createMatterEngine(matterDiv);

const { width, height } = paper.view.bounds;

const rect = new paper.Rectangle(
  new paper.Point(0, 0),
  new paper.Point(width, height)
);
rect.center = paper.view.center;

const fullScreenRect = new paper.Path.Rectangle(rect);

const text = new paper.CompoundPath(pathString);
text.fillRule = "evenodd";
const {
  viewSize: { width: viewWidth },
} = paper.view;

const DESIRED_TEXT_WIDTH = viewWidth - 32 * 2;

text.scale(DESIRED_TEXT_WIDTH / text.bounds.width);

text.position = paper.view.center;

const scene = fullScreenRect.subtract(text);
text.remove();

const depth = 5;

const backgroundHexColor = "#FAFFEA";
const hueOffset = 100;

scene.fillColor = new paper.Color(backgroundHexColor);
scene.shadowBlur = viewWidth / 80;
scene.shadowOffset = new paper.Point(-2, 3);

const topGradient = new paper.Gradient();
const hueAngle = (0 * 0.4 * 360 + hueOffset) % 360;
const strokeWidth = 2;
const strokeJoin = "round";

scene.shadowColor = new paper.Color(`hsla(${hueAngle}, 80%, 20%, 0.1)`);

topGradient.stops = [
  // @ts-ignore
  `hsla(${hueAngle}, 80%, ${50}%, 0.1)`,
  // @ts-ignore
  `hsla(${(hueAngle + 120) % 360}, 80%, ${50}%, 0.1)`,
  // @ts-ignore
  `hsla(${(hueAngle + 240) % 360}, 80%, ${50}%, 0.1)`,
];

scene.strokeColor = new paper.Color(
  topGradient,
  new paper.Point(scene.bounds.x, scene.bounds.y),
  new paper.Point(scene.bounds.right, scene.bounds.right)
);
scene.strokeWidth = strokeWidth;
scene.strokeJoin = strokeJoin;

const renderLoops: (() => void)[] = [];

const iterate = getRecursiveIterator<paper.PathItem>((_scene, i) => {
  const copy = _scene.clone();

  const fillVal = 1 - ((i + 1) / depth) * 0.1;
  const strokeGradient = new paper.Gradient();
  const alpha = 1;
  const hueAngle = ((i / depth) * 0.4 * 360 + hueOffset) % 360;

  copy.scale(0.989);

  copy.shadowBlur = viewWidth / 80;
  copy.shadowOffset = new paper.Point(-2, 3);
  copy.shadowColor = new paper.Color(`hsla(${hueAngle}, 100%, 20%, 0.1)`);

  strokeGradient.stops = [
    // @ts-ignore
    `hsla(${hueAngle}, 80%, ${50 * fillVal}%, ${alpha}`,
    // @ts-ignore
    `hsla(${(hueAngle + 120) % 360}, 80%, ${50 * fillVal}%, ${alpha}`,
    // @ts-ignore
    `hsla(${(hueAngle + 240) % 360}, 80%, ${50 * fillVal}%, ${alpha}`,
  ];

  copy.strokeColor = new paper.Color(
    strokeGradient,
    new paper.Point(copy.bounds.x, copy.bounds.y),
    new paper.Point(copy.bounds.right, copy.bounds.right)
  );
  copy.strokeWidth = strokeWidth;
  copy.strokeJoin = strokeJoin;
  copy.sendToBack();

  const stiffnessMin = 0.0;
  const stiffnessMax = 1;
  const stiffnessRange = stiffnessMax - stiffnessMin;

  const { renderLoop, composite } = makeWobbly(copy, {
    stiffness: stiffnessMin + ((depth - i) / (depth - 1)) * stiffnessRange,
  });
  renderLoops.push(renderLoop);
  Composite.add(world, composite);

  return copy;
});

iterate(scene, depth);
fullScreenRect.sendToBack();
fullScreenRect.fillColor = new paper.Color(backgroundHexColor);

const cursorLoop = createMouseTrackerBody(world, render);
renderLoops.push(cursorLoop);

function renderLoop() {
  renderLoops.forEach((loop) => loop());
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
