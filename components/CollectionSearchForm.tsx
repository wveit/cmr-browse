import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { searchCollections } from "../service/cmr";
import type { Collection } from "../types/Collection";

interface CollectionSearchProps {
  baseUrl: string;
  onSearchResults: (collections: Collection[]) => void;
  token: string;
}
export function CollectionSearchForm({
  baseUrl,
  onSearchResults,
  token,
}: CollectionSearchProps) {
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
      if (axios.isAxiosError(error)) {
        console.log("Error", error.response);
        const response = error.response;
        if (response) {
          setError(`Error: ${response.status} - ${response.data.errors[0]}`);
        } else {
          setError("Unknown Error");
        }
      }
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
