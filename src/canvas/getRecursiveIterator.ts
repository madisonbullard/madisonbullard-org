export function getRecursiveIterator<T>(
  fn: (item: T, i: number) => T,
  { index = 0, ...opts }: { index?: number } = {}
) {
  return function iterate(item: T, depth: number) {
    const _item = fn(item, index);

    if (depth > 1) {
      const _iterate = getRecursiveIterator(fn, {
        ...opts,
        index: index + 1,
      });
      _iterate(_item, depth - 1);
    }
  };
}
