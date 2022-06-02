import { Engine, Render, Runner } from "matter-js";

export function createMatterEngine(node: HTMLElement) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const engine = Engine.create({ gravity: { x: 0, y: 0 } });
  const world = engine.world;

  const render = Render.create({
    element: node,
    engine,
    options: {
      width: width,
      height: height,
      showVelocity: true,
    },
  });

  const runner = Runner.create();
  Runner.run(runner, engine);

  return { world, render };
}
