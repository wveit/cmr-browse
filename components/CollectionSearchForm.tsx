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
    <div className="container">
      <h3>Search Collections</h3>
      <form>
        <label htmlFor="collection-search-short-name-input">short name</label>
        <input
          id="collection-search-short-name-input"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
        />
        <label htmlFor="collection-search-tool-name-input">tool name</label>
        <input
          id="collection-search-tool-name-input"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
        />
        <label htmlFor="collection-search-service-name-input">
          service name
        </label>
        <input
          id="collection-search-service-name-input"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <label htmlFor="collection-search-provider-input">provider</label>
        <input
          id="collection-search-provider-input"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />
        <span></span>
        <div>
          <button type="button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        {error ? <div className="error">{error}</div> : null}
      </form>
      <style jsx>{`
        .container {
          border: 1px solid black;
          padding: 1rem;
          border-radius: 0.3rem;
        }
        .error {
          color: red;
          font-weight: bold;
          padding: 0.3rem;
        }

        form {
          display: grid;
          grid-template-columns: 10rem 1fr;
          row-gap: 1rem;
        }

        label {
          text-align: right;
          padding-right: 1rem;
        }

        input {
          width: 20rem;
        }
      `}</style>
    </div>
  );
}
