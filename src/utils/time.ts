export const formatDuration = (
  timestamp1: number,
  timestamp2: number,
): string => {
  const diffInSeconds = Math.abs(timestamp1 - timestamp2) / 1000;
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = Math.floor(diffInSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
};
