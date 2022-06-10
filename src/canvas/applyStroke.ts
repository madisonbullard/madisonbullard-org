import * as paper from "paper";

export function applyStroke(
  path: paper.PathItem,
  hueAngle: number,
  lightness: number
) {
  const alpha = 1;

  const strokeWidth = 2;
  const strokeJoin = "round";
  const strokeGradient = new paper.Gradient();

  strokeGradient.stops = [
    // @ts-ignore
    `hsla(${hueAngle}, 80%, ${50 * lightness}%, ${alpha}`,
    // @ts-ignore
    `hsla(${(hueAngle + 120) % 360}, 80%, ${50 * lightness}%, ${alpha}`,
    // @ts-ignore
    `hsla(${(hueAngle + 240) % 360}, 80%, ${50 * lightness}%, ${alpha}`,
  ];

  const strokeColor = new paper.Color(
    strokeGradient,
    new paper.Point(path.bounds.x, path.bounds.y),
    new paper.Point(path.bounds.right, path.bounds.right)
  );

  path.strokeColor = strokeColor;
  path.strokeWidth = strokeWidth;
  path.strokeJoin = strokeJoin;
}
