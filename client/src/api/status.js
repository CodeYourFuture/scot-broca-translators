export const getStatus = () => {
  return fetch("/api/status").then(res => res.text());
};

export const getUsers = () => {
  return fetch("/api/users").then(res => res.json());
};
