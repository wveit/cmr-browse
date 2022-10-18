export function CollectionSearchResults({
  collections,
  selectedCollection,
  onCollectionSelect,
}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Concept Id</th>
            <th>Short Name</th>
            <th>Start Time</th>
            <th>Stop Time</th>
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

        table {
          border-collapse: collapse;
          border: 1px solid blue;
          max-height: 200px;
          overflow-y: scroll;
        }
        thead {
          background: rgb(222, 239, 240);
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
      <td>{collection.time_start || "--"}</td>
      <td>{collection.time_stop || "--"}</td>
    </tr>
  );
}
