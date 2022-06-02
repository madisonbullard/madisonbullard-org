import { Bodies, Body, Composite, Mouse, Render, World } from "matter-js";

export function createMouseTrackerBody(world: World, render: Render) {
  const mouse = Mouse.create(render.canvas);
  const cursor = Bodies.circle(300, 300, 25, {
    isStatic: false,
    density: 0.01,
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
