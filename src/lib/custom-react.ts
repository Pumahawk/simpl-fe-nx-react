import { lazy, ReactNode, useCallback } from "react";

export function promiseComponent<T>(
  promise: Promise<T>,
  component: (data: T) => ReactNode
) {
  return lazy(() =>
    promise.then((data) => ({ default: () => component(data) }))
  );
}

export function usePromiseComponent<T>(
  promise: Promise<T>,
  component: (data: T) => ReactNode,
  deps: React.DependencyList
) {
  return useCallback(promiseComponent(promise, component), deps);
}
