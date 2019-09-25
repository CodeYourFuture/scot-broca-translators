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

export const cancelTranslation = id => {
  const userRequest = {
    method: "DELETE",
    body: JSON.stringify({
      translationId: id
    }),
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  };

  return fetch(`/api/translations/${id}`, userRequest);
};

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

export const getTranslationById = translationId => {
  return fetch(`/api/translations/${translationId}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
