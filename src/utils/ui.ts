import { gameRegion } from "../hooks/useLogLine";

export const getInitials = (fullName: string): string => {
  if (!fullName) {
    return "";
  }

  if (gameRegion === "Chinese") {
    return fullName.slice(0, 2);
  }

  const nameParts = fullName.split(" ");
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
  return initials.join(".") + ".";
};
