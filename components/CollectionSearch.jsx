import { useRef } from "react";
import { searchCollections } from "../service/cmr";

export function CollectionSearch({ baseUrl, onSearchResults }) {
  const shortNameRef = useRef();
  const toolNameRef = useRef();

  async function handleSearchClick() {
    const shortName = shortNameRef.current.value;
    const toolName = toolNameRef.current.value;
    const collections = await searchCollections({
      baseUrl,
      shortName,
      toolName,
    });
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
