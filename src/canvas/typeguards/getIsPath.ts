export function getIsPath(
  item: paper.Item | null | undefined
): item is paper.Path {
  if (!item) {
    return false;
  }
  return "area" in item;
}
