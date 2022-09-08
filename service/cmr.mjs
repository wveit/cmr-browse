import axios from "axios";

export async function searchCollections({
  baseUrl,
  shortName,
  toolName,
  provider,
  token
}) {
  let url = `${baseUrl}/search/collections.json?page_size=200`;
  let headers = {};
  if (shortName) url += `&short_name=${shortName}`;
  if (toolName) url += `&tool_name=${toolName}`;
  if (provider) url += `&provider=${provider}`;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(url, { headers }).then((res) => res.data);
  return response.feed.entry;
}

export async function searchVariables({
  baseUrl,
  variableIdList,
  format = "json",
}) {
  const variablesData = [];

  const promises = [];
  for (let id of variableIdList) {
    const url = `${baseUrl}/search/variables.${format}?concept_id=${id}`;
    promises.push(axios.get(url));
  }

  for (let index in variableIdList) {
    const promise = promises[index];
    const id = variableIdList[index];

    try {
      const data = await promise.then((res) => res.data);
      variablesData.push(data.items[0]);
    } catch {
      variablesData.push({ concept_id: id, status: "error" });
    }
  }

  return variablesData;
}
