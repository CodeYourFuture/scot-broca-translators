export const putTranslation = (id, content) => {
  const putParams = {
    body: JSON.stringify({ content: content }),
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  };
  return fetch(`/api/translations/${id}`, putParams).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  });
};
