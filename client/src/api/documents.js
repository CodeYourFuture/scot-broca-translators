export const getDocuments = () => {
  return fetch("/api/documents", {
    method: "get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};

export const getDocumentById = documentId => {
  return fetch(`/api/documents/${documentId}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};

export const postDocument = (
  fromLanguage,
  toLanguage,
  dueDate,
  text,
  name,
  haveAllFieldsValue
) => {
  const postParams = {
    body: JSON.stringify({
      fromLanguage,
      toLanguage,
      dueDate,
      text,
      name,
      haveAllFieldsValue
    })
  };
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
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw res;
    }
  });
};
