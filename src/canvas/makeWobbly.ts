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
    damping = 0.13,
  }: Partial<IConstraintDefinition> & Partial<IBodyDefinition> = {}
) {
  const composite = Composite.create();
  path.children.forEach((child) => {
    if (getIsPath(child)) {
      const constraints: Constraint[] = [];
      const bodies: Body[] = [];
      const anchors: Body[] = [];

      child.segments.forEach((seg, i) => {
        const coords = [seg.point.x, seg.point.y] as const;
        const body = Bodies.circle(...coords, 1, {
          density,
          restitution,
        });
        const anchor = Bodies.circle(...coords, 300, {
          density,
          restitution,
        });

        bodies.push(body);
        anchors.push(anchor);
        constraints.push(
          Constraint.create({
            bodyA: body,
            bodyB: anchor,
            stiffness: 0.02 * stiffness,
            damping,
          }),
          Constraint.create({
            bodyA: body,
            bodyB: bodies[Math.abs(i - 1) % bodies.length],
            stiffness,
            damping,
          }),
          Constraint.create({
            bodyA: body,
            bodyB: bodies[Math.abs(i - 2) % bodies.length],
            stiffness,
            damping,
          })
        );
      });

      Composite.add(composite, [...bodies, ...constraints]);
    }
  });

  return composite;
}
