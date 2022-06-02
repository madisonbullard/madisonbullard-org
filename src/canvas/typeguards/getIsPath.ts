export function getIsPath(item: paper.Item): item is paper.Path {
  return "segments" in item;
}
