import { useRef } from "react";

export function CollectionSearch({ baseUrl, onSearchResults }) {
  const shortNameRef = useRef();
  const toolNameRef = useRef();

  async function handleSearchClick() {
    const shortName = shortNameRef.current.value;
    const toolName = toolNameRef.current.value;
    const collections = await fetchCollections(baseUrl, shortName, toolName);
    onSearchResults(collections);
  }

  return (
    <div>
      <h2>Collection Search:</h2>{" "}
      <div>
        short name: <input ref={shortNameRef} />
        <br />
        tool name: <input ref={toolNameRef} />
        <br />
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
}

async function fetchCollections(baseUrl, shortName, toolName) {
  const url = `${baseUrl}/search/collections.json?page_size=200`;
  if (shortName) url += `&short_name=${shortName}`;
  if (toolName) url += `&tool_name=${toolName}`;
  const response = await fetch(url).then((res) => res.json());
  return response.feed.entry;
}
