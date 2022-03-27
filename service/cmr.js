export async function searchCollections({ baseUrl, shortName, toolName }) {
  const url = `${baseUrl}/search/collections.json?page_size=200`;
  if (shortName) url += `&short_name=${shortName}`;
  if (toolName) url += `&tool_name=${toolName}`;
  const response = await fetch(url).then((res) => res.json());
  return response.feed.entry;
}

export async function searchVariables({ baseUrl, variableIdList }) {
  const variablesData = [];

  const promises = [];
  for (let id of variableIdList) {
    const url = `${baseUrl}/search/variables.json?concept_id=${id}`;
    promises.push(fetch(url));
  }

  for (let index in variableIdList) {
    const promise = promises[index];
    const id = variableIdList[index];

    try {
      const data = await promise.then((res) => res.json());
      variablesData.push(data.items[0]);
    } catch {
      variablesData.push({ concept_id: id, status: "error" });
    }
  }

  return variablesData;
}
