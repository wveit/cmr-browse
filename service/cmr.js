import axios from "axios";

export async function searchCollections({
  baseUrl,
  shortName,
  toolName,
  provider,
}) {
  let url = `${baseUrl}/search/collections.json?page_size=200`;
  if (shortName) url += `&short_name=${shortName}`;
  if (toolName) url += `&tool_name=${toolName}`;
  if (provider) url += `&provider=${provider}`;
  const response = await axios.get(url).then((res) => res.data);
  return response.feed.entry;
}

export async function searchVariables({ baseUrl, variableIdList }) {
  const variablesData = [];

  const promises = [];
  for (let id of variableIdList) {
    const url = `${baseUrl}/search/variables.json?concept_id=${id}`;
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
