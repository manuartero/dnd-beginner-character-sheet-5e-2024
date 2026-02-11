export function isValidScore(value: string): boolean {
  if (value === "") return false;
  const num = Number.parseInt(value, 10);
  return !Number.isNaN(num) && num >= 3 && num <= 18;
}

export function isValidHp(value: string): boolean {
  if (value === "") return false;
  const num = Number.parseInt(value, 10);
  return !Number.isNaN(num) && num >= 1;
}
