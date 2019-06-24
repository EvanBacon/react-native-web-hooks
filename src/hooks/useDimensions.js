export function useREM(multiple) {
  return parseInt(getComputedStyle(document.documentElement).fontSize) * multiple;
}
