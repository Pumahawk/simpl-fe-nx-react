import { lazy, ReactNode } from "react";

export function promiseComponent<T>(
  promise: Promise<T>,
  component: (data: T) => ReactNode
) {
  return lazy(() =>
    promise.then((data) => ({ default: () => component(data) }))
  );
}
