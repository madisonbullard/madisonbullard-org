import * as paper from "paper";

function metaball(id: string) {
  // Ported from original Metaball script by SATO Hiroyuki
  // http://park12.wakwak.com/~shp/lc/et/en_aics_script.html

  paper.setup(id);

  paper.project.currentStyle = {
    ...paper.project.currentStyle,
    fillColor: new paper.Color(0, 0, 0),
  };

  const ballPositions = [
    [255, 129],
    [610, 73],
    [486, 363],
    [117, 459],
    [484, 726],
    [843, 306],
    [789, 615],
    [1049, 82],
    [1292, 428],
    [1117, 733],
    [1352, 86],
    [92, 798],
  ];

  const handle_len_rate = 2.45;
  const circlePaths: paper.Path.Circle[] = [];
  const radius = 50;
  for (let i = 0, l = ballPositions.length; i < l; i++) {
    const circlePath = new paper.Path.Circle({
      center: ballPositions[i],
      radius,
    });
    circlePaths.push(circlePath);
  }

  const largeCircle = new paper.Path.Circle({
    center: [676, 433],
    radius: radius * 2,
  });
  circlePaths.push(largeCircle);

  function onMouseMove(event: paper.ToolEvent) {
    largeCircle.position = event.point;
    generateConnections(circlePaths);
  }

  const tool = new paper.Tool();
  tool.onMouseMove = onMouseMove;

  const connections = new paper.Group();
  function generateConnections(paths: paper.Path.Circle[]) {
    // Remove the last connection paths:
    connections.children = [];

    for (let i = 0, l = paths.length; i < l; i++) {
      for (let j = i - 1; j >= 0; j--) {
        const path1 = paths[i];
        const path2 = paths[j];

        if (path1 && path2) {
          const path = getMetaball(path1, path2, 0.5, handle_len_rate, 300);
          if (path) {
            connections.addChild(path);
            path.removeOnMove();
          }
        }
      }
    }
  }

  generateConnections(circlePaths);
}

function getMetaball(
  ball1: paper.Path.Circle,
  ball2: paper.Path.Circle,
  v: number,
  handle_len_rate: number,
  maxDistance: number
) {
  const center1 = ball1.position;
  const center2 = ball2.position;
  let radius1 = ball1.bounds.width / 2;
  let radius2 = ball2.bounds.width / 2;
  const pi2 = Math.PI / 2;
  const d = center1.getDistance(center2);
  let u1: number | undefined = undefined;
  let u2: number | undefined = undefined;

  if (radius1 == 0 || radius2 == 0) return;

  if (d > maxDistance || d <= Math.abs(radius1 - radius2)) {
    return;
  } else if (d < radius1 + radius2) {
    // case circles are overlapping
    u1 = Math.acos(
      (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)
    );
    u2 = Math.acos(
      (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)
    );
  } else {
    u1 = 0;
    u2 = 0;
  }

  // @ts-ignore getAngleInRadians() can indeed take no args
  const angle1 = center2.subtract(center1).getAngleInRadians();
  const angle2 = Math.acos((radius1 - radius2) / d);
  const angle1a = angle1 + u1 + (angle2 - u1) * v;
  const angle1b = angle1 - u1 - (angle2 - u1) * v;
  const angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v;
  const angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v;
  const p1a = center1.add(getVector(angle1a, radius1));
  const p1b = center1.add(getVector(angle1b, radius1));
  const p2a = center2.add(getVector(angle2a, radius2));
  const p2b = center2.add(getVector(angle2b, radius2));

  // define handle length by the distance between
  // both ends of the curve to draw
  const totalRadius = radius1 + radius2;
  let d2 = Math.min(
    v * handle_len_rate,
    p1a.subtract(p2a).length / totalRadius
  );

  // case circles are overlapping:
  d2 *= Math.min(1, (d * 2) / (radius1 + radius2));

  radius1 *= d2;
  radius2 *= d2;

  const path = new paper.Path({
    segments: [p1a, p2a, p2b, p1b],
    style: ball1.style,
    closed: true,
  });

  const [seg0, seg1, seg2, seg3] = path.segments;
  if (seg0 && seg1 && seg2 && seg3) {
    seg0.handleOut = getVector(angle1a - pi2, radius1);
    seg1.handleIn = getVector(angle2a + pi2, radius2);
    seg2.handleOut = getVector(angle2b - pi2, radius2);
    seg3.handleIn = getVector(angle1b + pi2, radius1);
  }
  return path;
}

function getVector(radians: number, length: number) {
  return new paper.Point({
    // Convert radians to degrees:
    angle: (radians * 180) / Math.PI,
    length: length,
  });
}

export default metaball;
