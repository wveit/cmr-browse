import Inspector from "react-inspector";

export function CollectionDetails({ collection }) {
  if (!collection) {
    return <div>No Collection Selected</div>;
  } else {
    return <Inspector data={collection} expandLevel={10} />;
  }
}
