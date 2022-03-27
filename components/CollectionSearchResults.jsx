export function CollectionSearchResults({
  collections,
  selectedCollection,
  onCollectionSelect,
}) {
  return (
    <div>
      <h2>Collection Search Results:</h2>
      <table>
        <thead>
          <tr>
            <th>Concept Id</th>
            <th>Short Name</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <CollectionRow
              key={collection.id}
              collection={collection}
              selectedCollection={selectedCollection}
              onClick={() => onCollectionSelect(collection)}
            />
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table :global(.selected) {
          background-color: lightblue;
        }
      `}</style>
    </div>
  );
}

function CollectionRow({ collection, selectedCollection, onClick }) {
  let classes = "";
  if (selectedCollection && collection.id === selectedCollection.id) {
    classes = "selected";
  }

  return (
    <tr className={classes} onClick={onClick}>
      <td>{collection.id}</td>
      <td>{collection.short_name}</td>
    </tr>
  );
}
