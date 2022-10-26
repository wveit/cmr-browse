import { Collection } from "../types/Collection";

interface Props {
  collections: Collection[];
  hits: number;
  selectedCollection: Collection | null;
  onCollectionSelect: (collection: Collection) => void;
}
export function CollectionSearchResults({
  collections,
  hits,
  selectedCollection,
  onCollectionSelect,
}: Props) {
  return (
    <div className="CollectionSearchResults">
      <div className="header">
        <h3>Collection Search Results</h3>
        <div>
          Collections Loaded: {collections.length} / Collections Available:{" "}
          {hits}
        </div>
      </div>

      <div className="scroll">
        {collections.map((collection) => (
          <CollectionRow
            key={collection.id}
            collection={collection}
            selectedCollection={selectedCollection}
            onClick={() => onCollectionSelect(collection)}
          />
        ))}
      </div>

      <style jsx>{`
        .CollectionSearchResults {
          background-color: lightblue;
          border: 1px solid blue;
          border-radius: 0.2rem;
        }
        .header {
          display: flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid blue;
        }
        .header > * {
          margin-right: 2rem;
        }
        .scroll {
          min-height: 100px;
          max-height: 500px;
          overflow-y: scroll;
          padding: 0.2rem;
          border-radius: 0.2rem;
        }
      `}</style>
    </div>
  );
}

function CollectionRow({
  collection,
  selectedCollection,
  onClick,
}: {
  collection: Collection;
  selectedCollection: Collection | null;
  onClick: () => void;
}) {
  let classes = "CollectionRow";
  if (selectedCollection && collection.id === selectedCollection.id) {
    classes += " selected";
  }

  return (
    <div className={classes} onClick={onClick}>
      <div className="content">
        <div className="names">
          <div>{collection.short_name}</div>
          <div>{collection.id}</div>
        </div>
        <div className="dates">
          {formatDate(collection.time_start)} to{" "}
          {formatDate(collection.time_end)}
        </div>
      </div>
      <img src={findThumbnail(collection)} alt="Thumbnail" />

      <style jsx>{`
        .CollectionRow {
          display: flex;
          padding: 0.5rem;
          border: 1px solid gray;
          border-radius: 0.2rem;
          margin: 0.1rem 0;
          background-color: white;
        }

        .CollectionRow.selected {
          background-color: rgb(234, 249, 253);
        }

        .names {
          display: grid;
          grid-template-columns: 50% 50%;
          flex-grow: 1;
        }

        .names > * {
          word-break: break-all;
          padding: 0.2rem;
        }

        .content {
          flex-grow: 1;
        }
        .dates {
          display: inline-flex;
          justify-content: center;
        }

        img {
          margin-left: auto;
          width: 75px;
        }
      `}</style>
    </div>
  );
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    return "today";
  }
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

function findThumbnail(collection: Collection) {
  for (let link of collection.links || []) {
    if (link.href.endsWith(".jpg") || link.href.endsWith(".png"))
      return link.href;
  }
  return "file.png";
}
