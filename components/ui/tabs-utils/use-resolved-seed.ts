const DEFAULT_SEED = 7;

/** The seed to draw with. A fixed default keeps server and client output identical. */
export function useResolvedSeed(seed?: number): number {
  return seed ?? DEFAULT_SEED;
}
