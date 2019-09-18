export const pickDocument = id => {
  const userRequest = {
    method: "POST",
    body: JSON.stringify({
      document_id: id
    }),
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  };

  return fetch("/api/translations", userRequest);
};
