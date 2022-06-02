import * as paper from "paper";

export function setupScene(
  path: paper.PathItem,
  subtractFromPath: paper.PathItem,
  margin: number
) {
  const {
    viewSize: { width: viewWidth },
  } = paper.view;

  const DESIRED_TEXT_WIDTH = viewWidth - margin * 2;

  path.scale(DESIRED_TEXT_WIDTH / path.bounds.width);

  path.position = paper.view.center;

  const scene = subtractFromPath.subtract(path);
  path.remove();

  return scene;
}
