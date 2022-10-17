import { Tabs } from "./Tabs";
import { CollectionDetails } from "./CollectionDetails";
import { VariablesUmm } from "./VariablesUmm";
import { Variables } from "./Variables";
import { Granules } from "./Granules";

export function CollectionDisplay({ baseUrl, collection }) {
  return (
    <div>
      <h2>Collection:</h2>
      <Tabs tabs={["details", "variables", "variables_umm", "granules"]}>
        <CollectionDetails collection={collection} />
        <Variables baseUrl={baseUrl} collection={collection} />
        <VariablesUmm baseUrl={baseUrl} collection={collection} />
        <Granules baseUrl={baseUrl} collection={collection} />
      </Tabs>
    </div>
  );
}
