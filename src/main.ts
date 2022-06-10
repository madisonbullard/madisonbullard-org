import "./style.css";

import { Composite } from "matter-js";
import * as paper from "paper";

import { applyStroke } from "./canvas/applyStroke";
import { pathString } from "./canvas/assets/knewave_hiexclam.path";
import { createMouseTrackerBody } from "./canvas/createMouseTrackerBody";
import { makeWobbly } from "./canvas/makeWobbly";
import { setupMatter } from "./canvas/setupMatter";
import { setupPaper } from "./canvas/setupPaper";
import { getIsPath } from "./canvas/typeguards/getIsPath";

const appDiv = document.querySelector<HTMLDivElement>("#app");

const CANVAS_WIDTH = 500;
setupPaper(appDiv, CANVAS_WIDTH);
const { render, world } = setupMatter(appDiv, CANVAS_WIDTH);

const { width, height } = paper.view.bounds;

const backgroundHexColor = "#FAFFEA";
if (appDiv) {
  appDiv.style.backgroundColor = backgroundHexColor;
}

const rect = new paper.Rectangle(
  new paper.Point(0, 0),
  new paper.Point(width + 50, height + 50)
);
rect.center = paper.view.center;

const text = new paper.CompoundPath(pathString);
text.fillRule = "evenodd";

const hueOffset = 100;

const textWidth = Math.min(width * 0.9, 500);
const depth = 2;

const renderLoops: (() => void)[] = [];
function renderLoop() {
  renderLoops.forEach((loop) => loop());
  window.requestAnimationFrame(renderLoop);
}

text.scale(textWidth / text.bounds.width);

text.position = paper.view.center;
// @ts-ignore
text.fillColor = backgroundHexColor;

const cursorRadius = 30;
const cursorLoop = createMouseTrackerBody(world, render, cursorRadius);
renderLoops.push(cursorLoop);

for (let i = 0; i < depth; i++) {
  const textClone = text.clone();
  textClone.scale(1 - i * 0.07);

  const lightness = 1 - ((i + 1) / depth) * 0.03;
  const hueAngle = ((i / depth) * 0.4 * 360 + hueOffset) % 360;

  applyStroke(textClone, hueAngle, lightness);

  const stiffnessMin = 0.1;
  const stiffnessMax = 1;
  const stiffnessRange = stiffnessMax - stiffnessMin;
  const percentOfTheWayThroughTheLoop = i / depth;
  const stiffness =
    stiffnessMax - percentOfTheWayThroughTheLoop * stiffnessRange;

  const composite = makeWobbly(textClone, {
    stiffness,
  });

  textClone.addChild(new paper.Path.Rectangle(rect));

  // @ts-ignore
  textClone.shadowColor = "#00000022";
  textClone.shadowBlur = 12;

  function renderLoop() {
    let topIndex = 0;
    textClone.children.forEach((child, i) => {
      // Don't include the last child since it is the square canvas
      if (getIsPath(child) && i < textClone.children.length - 1) {
        child.segments.forEach((seg, i) => {
          const bodies = composite.bodies;
          const body = bodies[topIndex + i];
          if (body) {
            seg.point.x = body.position.x;
            seg.point.y = body.position.y;
          }
        });
        topIndex += child.segments.length;
      }
    });
  }

  renderLoops.push(renderLoop);

  Composite.add(world, composite);
}

text.remove();

renderLoop();
