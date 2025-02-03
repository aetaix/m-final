export function formFieldWidth(width: string) {
  const percentage = parseInt(width);
  return percentage === 100
    ? "100%"
    : `calc(${percentage}% - var(--form-x-gap))`;
}
