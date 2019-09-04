export const getDocuments = () => {
  return fetch("/api/documents", {
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
