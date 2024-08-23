export function htmlEventAdapter<T extends HTMLInputElement>(
  fn: (value: string) => void
): (event: React.FormEvent<T>) => void {
  return (event) => fn(event.currentTarget.value);
}
