export function debounce<TArgs extends readonly unknown[], TReturn = void>(
  fn: (...args: TArgs) => TReturn,
  delay: number
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: TArgs): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
