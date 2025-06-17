export function mapMinutesToHMM(totalMinutes: number): string {
  if (typeof totalMinutes !== "number" || totalMinutes < 0) {
    throw new Error("Input must be a non-negative number of minutes.");
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Pad minutes with a leading zero if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours}:${formattedMinutes}`;
}
