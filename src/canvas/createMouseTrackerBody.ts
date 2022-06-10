import { Bodies, Body, Composite, Mouse, Render, World } from "matter-js";

export function createMouseTrackerBody(
  world: World,
  render: Render,
  radius: number
) {
  const mouse = Mouse.create(render.canvas);

  const cursor = Bodies.circle(-300, -300, radius, {
    isStatic: false,
    // restitution: 0.9,
    density: 0.2,
  });
  Composite.add(world, cursor);

  return function renderLoop() {
    Body.setPosition(cursor, {
      x: mouse.position.x,
      y: mouse.position.y,
    });
  };
}
