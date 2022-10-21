import { useRef, useState } from "react";
import { searchCollections } from "../service/cmr";

export function CollectionSearch({ baseUrl, onSearchResults, token }) {
  const [shortName, setShortName] = useState("");
  const [toolName, setToolName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [provider, setProvider] = useState("");
  const [error, setError] = useState("");

  async function handleSearchClick() {
    try {
      const collections = await searchCollections({
        baseUrl,
        shortName,
        toolName,
        serviceName,
        provider,
        token: token || undefined,
      });
      setError("");
      onSearchResults(collections);
    } catch (error) {
      console.log("Error", error.response);
      const response = error.response;
      setError(`Error: ${response.status} - ${response.data.errors[0]}`);
    }
  }

  return (
    <div>
      <div>
        short name:{" "}
        <input
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
        />
        <br />
        tool name:{" "}
        <input value={toolName} onChange={(e) => setToolName(e.target.value)} />
        <br />
        service name:{" "}
        <input
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <br />
        provider:{" "}
        <input value={provider} onChange={(e) => setProvider(e.target.value)} />
        <br />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {error ? <div className="error">{error}</div> : null}
      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
}
