export const createCache = ({
  maxAge,
  maxEntries
}: {
  maxAge?: number;
  maxEntries?: number;
} = {}) => {
  const cache = new Map<string, any>();
  const timerIds: number[] = [];

  return {
    memo<T>(key: string, fn: () => T) {
      if (cache.has(key)) {
        return cache.get(key) as T;
      }
      const result = fn();
      cache.set(key, result);

      // handle maxSize
      if (maxEntries && cache.size > maxEntries) {
        const firstKey = [...cache.keys()][0];
        cache.delete(firstKey);
      }

      // handle maxAge
      if (maxAge) {
        timerIds.push(window.setTimeout(() => cache.delete(key), maxAge));
      }

      return result;
    },
    clearCache() {
      timerIds.forEach(window.clearTimeout);
      cache.clear();
    }
  };
};
