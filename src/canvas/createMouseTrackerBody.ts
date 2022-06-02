import { Bodies, Body, Composite, Mouse, Render, World } from "matter-js";
import * as paper from "paper";

export function createMouseTrackerBody(world: World, render: Render) {
  const mouse = Mouse.create(render.canvas);

  const radius = Math.max(paper.view.bounds.width / 12, 40);

  const cursor = Bodies.circle(-300, -300, radius, {
    isStatic: false,
  });
  Composite.add(world, cursor);

  return function renderLoop() {
    if (mouse.position.x || mouse.position.y) {
      Body.setPosition(cursor, {
        x: mouse.position.x,
        y: mouse.position.y,
      });
    }
  };
}
