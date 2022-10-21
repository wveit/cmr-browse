import axios from "axios";

export async function searchCollections({
  baseUrl,
  shortName,
  toolName,
  serviceName,
  provider,
  token,
}) {
  let url = `${baseUrl}/search/collections.json?page_size=200&include_granule_counts=true&options[short_name][pattern]=true`;
  let headers = {};
  if (shortName) url += `&short_name=${shortName}`;
  if (toolName) url += `&tool_name=${toolName}`;
  if (serviceName) url += `&service_name=${serviceName}`;
  if (provider) url += `&provider=${provider}`;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(url, { headers }).then((res) => res.data);
  return response.feed.entry;
}

export async function searchVariables({
  baseUrl,
  variableIdList,
  token = null,
  format = "json",
}) {
  const variablesData = [];

  const promises = [];
  for (let id of variableIdList) {
    const url = `${baseUrl}/search/variables.${format}?concept_id=${id}`;
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    promises.push(axios({ method: "get", url, headers }));
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

export async function searchGranules({ baseUrl, collectionId, token }) {
  let url = `${baseUrl}/search/granules.json?page_size=10`;
  if (collectionId) url += `&collection_concept_id=${collectionId}`;
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(url, { headers });
  const json = await response.json();

  const granules = json.feed.entry;
  const hits = Number.parseInt(response.headers.get("cmr-hits"));

  return { granules, hits };
}
