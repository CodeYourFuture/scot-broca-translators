export const isUser = () => {
  if (sessionStorage.getItem("userRole") === "User") {
    return true;
  } else {
    return false;
  }
};
