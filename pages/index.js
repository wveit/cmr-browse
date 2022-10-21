import { useState } from "react";
import { EnvironmentSelector } from "../components/EnvironmentSelector";
import { CollectionSearch } from "../components/CollectionSearch";
import { CollectionSearchResults } from "../components/CollectionSearchResults";
import { Tabs } from "../components/Tabs";
import { CollectionDetails } from "../components/CollectionDetails";
import { Variables } from "../components/Variables";
import { VariablesUmm } from "../components/VariablesUmm";
import { Granules } from "../components/Granules";
import { LoginControl } from "../components/LoginControl";

export default function Index() {
  const [environment, setEnvironment] = useState("");
  const [edlToken, setEdlToken] = useState("");
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const baseUrl = cmrBaseUrl(environment);

  function handleCollectionSearchResults(collections) {
    setCollections(collections);
    setSelectedCollection(collections[0]);
  }

  function handleSetEnvironment(environment) {
    setCollections([]);
    setSelectedCollection(null);
    setEnvironment(environment);
  }

  return (
    <div>
      <h1>CMR Browse</h1>
      <EnvironmentSelector
        environment={environment}
        onSetEnvironment={handleSetEnvironment}
        token={edlToken}
        onSetToken={setEdlToken}
      />
      <LoginControl environment={environment} />
      <h3>Search Collections</h3>
      <CollectionSearch
        baseUrl={baseUrl}
        onSearchResults={handleCollectionSearchResults}
        token={edlToken}
      />
      <CollectionSearchResults
        collections={collections}
        selectedCollection={selectedCollection}
        onCollectionSelect={setSelectedCollection}
      />
      <h3>Collection Details</h3>
      <Tabs tabs={["details", "variables", "variables_umm", "granules"]}>
        <CollectionDetails collection={selectedCollection} />
        <Variables
          baseUrl={baseUrl}
          collection={selectedCollection}
          token={edlToken}
        />
        <VariablesUmm
          baseUrl={baseUrl}
          collection={selectedCollection}
          token={edlToken}
        />
        <Granules
          baseUrl={baseUrl}
          collection={selectedCollection}
          token={edlToken}
        />
      </Tabs>
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
