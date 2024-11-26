export function roundTimeDownToNearest5(date: Date): Date {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.floor(minutes / 5) * 5;
  date.setMinutes(roundedMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}