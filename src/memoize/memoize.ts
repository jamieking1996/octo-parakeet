// T is a function that takes any argument, and then the function that is returned is asserted as the function T,
// with its arguments and return type intact so the argument and return types will appear when using the memoize function.
// The map is used to store the cached function
export default function memoize<T extends (...args: any[]) => any>(method: T): T {
  const functionCache: Map<string, ReturnType<T>> = new Map();
  return <T> ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (functionCache.has(key)) {
      return functionCache.get(key)!;
    }
    const functionOutput = method(...args);
    functionCache.set(key, functionOutput);
    return functionOutput;
  })
}