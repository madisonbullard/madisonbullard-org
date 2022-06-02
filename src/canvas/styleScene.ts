import * as paper from "paper";

export function styleScene(
  scene: paper.PathItem,
  background: string,
  viewWidth: number,
  hueOffset: number,
  strokeWidth: number,
  strokeJoin: paper.PathItem["strokeJoin"]
) {
  const topGradient = new paper.Gradient();
  const hueAngle = (0.4 * 360 + hueOffset) % 360;

  scene.fillColor = new paper.Color(background);

  scene.shadowColor = new paper.Color(`hsla(${hueAngle}, 80%, 20%, 0.1)`);
  scene.shadowBlur = viewWidth / 80;
  scene.shadowOffset = new paper.Point(-2, 3);

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

  return scene;
}
