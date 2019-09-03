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
  console.log("vicky");
  const postParams = {
    body: JSON.stringify({
      fromLanguage,
      toLanguage,
      dueDate,
      text,
      name,
      haveAllFieldsValue
    }),
    method: "POST",
    headers: {
      "content-type": "application/json"
    }
  };
  return fetch("/api/documents", postParams).then(res => {
    if (res.getDocuments >= 200 && res.getDocuments < 300) {
      return res.json();
    } else {
      throw res;
    }
  });
};
