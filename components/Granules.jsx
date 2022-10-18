import { useEffect, useState } from "react";
import { searchGranules } from "../service/cmr.mjs";

export function Granules({ baseUrl, collection, token }) {
  const [hits, setHits] = useState(0);
  const [granules, setGranules] = useState([]);

  useEffect(() => {
    if (!collection) return;
    searchGranules({ baseUrl, collectionId: collection.id, token }).then(
      (res) => {
        setHits(res.hits);
        setGranules(res.granules);
      }
    );
  }, [baseUrl, collection, token]);

  return (
    <div>
      <p>Hits: {hits}</p>
      <div className="GranuleList">
        {granules.map((g) => (
          <Granule key={g.id} granule={g} />
        ))}
      </div>

      <style jsx>{`
        .GranuleList {
          height: 200px;
          overflow-y: scroll;
          border: 1px solid gray;
        }
      `}</style>
    </div>
  );
}

function Granule({ granule }) {
  const [showDetails, setShowDetails] = useState(false);
  const detailsString = showDetails ? "hide details" : "show details";
  const detailsClassName = "Granule__details" + (showDetails ? "" : " hidden");

  const downloadUrl = findDownloadUrl(granule);

  return (
    <div className="Granule">
      <div>{granule.title}</div>
      <div>
        {granule.time_start || "---"} to {granule.time_end || "---"}
      </div>
      <div className="control-bar">
        <span
          className="details-control"
          onClick={() => setShowDetails(!showDetails)}
        >
          {detailsString}
        </span>
        <a href={downloadUrl} target="_blank" rel="noreferrer">
          download
        </a>
      </div>
      <div className={detailsClassName}>
        <pre>{JSON.stringify(granule, null, 2)}</pre>
      </div>

      <style jsx>{`
        .Granule {
          padding: 0.5rem;
          border: 1px solid rgb(150, 150, 150);
          margin: 1px;
        }
        .Granule:hover {
          background-color: rgb(237, 237, 237);
        }
        .Granule > * {
          margin-bottom: 0.5rem;
        }

        .hidden {
          display: none;
        }

        .control-bar > * {
          color: blue;
          cursor: pointer;
          margin-left: 2rem;
        }
        .control-bar > *:hover {
          color: rgb(118, 118, 196);
        }
      `}</style>
    </div>
  );
}

function findDownloadUrl(granule) {
  try {
    for (let link of granule.links) {
      if (
        link.rel === "http://esipfed.org/ns/fedsearch/1.1/data#" &&
        /\.nc$/.test(link.href)
      ) {
        return link.href;
      }
    }
  } catch (error) {}
}
