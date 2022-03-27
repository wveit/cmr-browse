import { Tabs } from "./Tabs";
import { CollectionDetails } from "./CollectionDetails";
import { Variables } from "./Variables";

export function CollectionDisplay({ baseUrl, collection }) {
  return (
    <div>
      <h2>Collection:</h2>
      <Tabs tabs={["details", "variables", "granules"]}>
        <CollectionDetails collection={collection} />
        <Variables baseUrl={baseUrl} collection={collection} />
        <div>Granules Search... coming soon</div>
      </Tabs>
    </div>
  );
}
