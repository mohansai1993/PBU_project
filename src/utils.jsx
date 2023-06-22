import Default from "./assets/default.png";
export const isCoach = (currentUser) => {
  if (currentUser === "coach") {
    return true;
  }
  return false;
};

export const imageOnError = (event) => {
  event.target.onerror = null;
  event.target.src = Default;
};
