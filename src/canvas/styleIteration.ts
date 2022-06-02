import * as paper from "paper";

export function styleIteration(
  scene: paper.PathItem,
  strokeWidth: number,
  strokeJoin: paper.PathItem["strokeJoin"],
  fillVal: number,
  alpha: number,
  hueAngle: number
) {
  const strokeGradient = new paper.Gradient();

  // scene.shadowBlur = viewWidth / 80;
  // scene.shadowOffset = new paper.Point(-2, 3);
  // scene.shadowColor = new paper.Color(`hsla(${hueAngle}, 100%, 20%, 0.1)`);

  strokeGradient.stops = [
    // @ts-ignore
    `hsla(${hueAngle}, 80%, ${50 * fillVal}%, ${alpha}`,
    // @ts-ignore
    `hsla(${(hueAngle + 120) % 360}, 80%, ${50 * fillVal}%, ${alpha}`,
    // @ts-ignore
    `hsla(${(hueAngle + 240) % 360}, 80%, ${50 * fillVal}%, ${alpha}`,
  ];

  scene.strokeColor = new paper.Color(
    strokeGradient,
    new paper.Point(scene.bounds.x, scene.bounds.y),
    new paper.Point(scene.bounds.right, scene.bounds.right)
  );
  scene.strokeWidth = strokeWidth;
  scene.strokeJoin = strokeJoin;
}
