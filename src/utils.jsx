export const isCoach = (currentUser) => {
  if (currentUser === "coach") {
    return true;
  }
  return false;
};
