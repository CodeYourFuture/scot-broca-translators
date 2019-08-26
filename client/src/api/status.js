export const getStatus = () => {
  return fetch("/api/status").then(res => res.text());
};

export const getUsers = () => {
  return fetch("/api/users").then(res => res.json());
};

export const getToken = (email, password) => {
  const postParams = {
    body: JSON.stringify({ email, password }),
    method: "POST",
    headers: {
      "content-type": "application/json"
    }
  };
  return fetch("/auth/login", postParams).then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw res;
    }
  });
};
