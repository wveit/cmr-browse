import Inspector from "react-inspector";
import type { Collection } from "../types/Collection";

export function CollectionDetails({
  collection,
}: {
  collection: Collection | null;
}) {
  if (!collection) {
    return <div>No Collection Selected</div>;
  } else {
    return <Inspector data={collection} expandLevel={10} />;
  }
}
