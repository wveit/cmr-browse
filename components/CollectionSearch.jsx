import { useRef, useState } from "react";
import { searchCollections } from "../service/cmr";

export function CollectionSearch({ baseUrl, onSearchResults, token }) {
  const shortNameRef = useRef();
  const toolNameRef = useRef();
  const serviceNameRef = useRef();
  const providerRef = useRef();
  const tokenRef = useRef();
  const [error, setError] = useState("");

  async function handleSearchClick() {
    const shortName = shortNameRef.current.value;
    const toolName = toolNameRef.current.value;
    const serviceName = serviceNameRef.current.value;
    const provider = providerRef.current.value;
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
        short name: <input ref={shortNameRef} />
        <br />
        tool name: <input ref={toolNameRef} />
        <br />
        service name: <input ref={serviceNameRef} />
        <br />
        provider: <input ref={providerRef} />
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
