import {
  Bodies,
  Constraint,
  Composite,
  Body,
  IBodyDefinition,
  IConstraintDefinition,
} from "matter-js";

import { getIsPath } from "./typeguards/getIsPath";

export function makeWobbly(
  path: paper.PathItem,
  {
    stiffness = 1,
    density = 0.02,
    restitution = 0.1,
  }: {
    stiffness?: IConstraintDefinition["stiffness"];
    density?: IBodyDefinition["density"];
    restitution?: IBodyDefinition["restitution"];
  } = {}
) {
  const composite = Composite.create();
  path.children.forEach((child) => {
    if (getIsPath(child)) {
      const constraints: Constraint[] = [];
      const bodies: Body[] = [];
      const anchors: Body[] = [];

      child.segments.forEach((seg) => {
        const coords = [seg.point.x, seg.point.y] as const;
        const body = Bodies.circle(...coords, 1, {
          density,
          restitution,
        });
        const anchor = Bodies.circle(...coords, 50, {
          density,
          restitution,
        });

        bodies.push(body);
        anchors.push(anchor);
      });

      bodies.forEach((body, i) => {
        constraints.push(
          Constraint.create({
            bodyA: body,
            bodyB: anchors[i],
            stiffness: 0.04 * stiffness,
          }),
          Constraint.create({
            bodyA: body,
            bodyB: bodies[i + 1] ? bodies[i + 1] : bodies[0],
            stiffness,
          }),
          Constraint.create({
            bodyA: body,
            bodyB: bodies[(i + 2) % bodies.length],
            stiffness,
          })
        );
      });

      Composite.add(composite, bodies);
      Composite.add(composite, constraints);
    }
  });

  function renderLoop() {
    let topIndex = 0;
    path.children.forEach((child) => {
      if (getIsPath(child)) {
        child.segments.forEach((seg, i) => {
          const bodies = composite.bodies;
          const body = bodies[topIndex + i];
          if (body) seg.point.x = body.position.x;
        });
        topIndex += child.segments.length;
      }
    });
  }

  return { composite, renderLoop };
}
