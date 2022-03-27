import { useState } from "react";
import { EnvironmentSelector } from "../components/EnvironmentSelector";
import { CollectionSearch } from "../components/CollectionSearch";
import { CollectionSearchResults } from "../components/CollectionSearchResults";
import { CollectionDisplay } from "../components/CollectionDisplay";

export default function Index() {
  const [environment, setEnvironment] = useState("");
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  function handleCollectionSearchResults(collections) {
    setCollections(collections);
    setSelectedCollection(collections[0]);
  }

  return (
    <div>
      <h1>Search Collections</h1>
      <EnvironmentSelector
        environment={environment}
        onSetEnvironment={setEnvironment}
      />
      <CollectionSearch
        baseUrl={cmrBaseUrl(environment)}
        onSearchResults={handleCollectionSearchResults}
      />
      <CollectionSearchResults
        collections={collections}
        selectedCollection={selectedCollection}
        onCollectionSelect={setSelectedCollection}
      />
      <CollectionDisplay
        collection={selectedCollection}
        baseUrl={cmrBaseUrl(environment)}
      />
    </div>
  );
}

function cmrBaseUrl(environment) {
  let envString = environment + ".";
  if (environment === "ops") {
    envString = "";
  }
  return `https://cmr.${envString}earthdata.nasa.gov`;
}
