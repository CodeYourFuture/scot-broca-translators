export const putUser = (id, newName, newEmail, newPassword) => {
  const putParams = {
    body: JSON.stringify({
      name: newName,
      email: newEmail,
      password: newPassword
    }),
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  };

  return fetch(`/api/translations/${id}`, putParams);
};
