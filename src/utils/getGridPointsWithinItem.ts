import * as paper from "paper";

function getGridPointsWithinItem(item: paper.Item, gridResolution: number) {
  const gridStartX = item.bounds.x;
  const gridStartY = item.bounds.y;

  const gridEndX = gridStartX + item.bounds.width;
  const gridEndY = gridStartY + item.bounds.height;

  const points: paper.Point[] = [];

  for (let i = gridStartX; i < gridEndX; i += gridResolution) {
    for (let j = gridStartY; j < gridEndY; j += gridResolution) {
      const point = new paper.Point(i, j);
      if (item.hitTest(point)) {
        points.push(point);
      }
    }
  }

  return points;
}

export default getGridPointsWithinItem;
