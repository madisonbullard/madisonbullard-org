import { Engine, Render, Runner } from "matter-js";

const NODE_ID = "matter";

export function setupMatter(node: HTMLElement | null, width: number) {
  if (!node) {
    throw new Error("No DOM node passed to setupMatter");
  }

  const divNode = document.createElement("div");
  divNode.setAttribute("id", NODE_ID);
  node.appendChild(divNode);

  const div = document.getElementById(NODE_ID) as HTMLDivElement | null;

  if (!div) {
    throw new Error('No canvas element with id "matter" found.');
  }

  const height = width;

  const engine = Engine.create({ gravity: { x: 0, y: 0 } });
  const world = engine.world;

  const render = Render.create({
    element: div,
    engine,
    options: {
      width,
      height,
      showVelocity: true,
    },
  });

  const runner = Runner.create();
  Runner.run(runner, engine);

  return { world, render };
}
