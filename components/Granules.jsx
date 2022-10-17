import { useEffect, useState } from "react";
import { searchGranules } from "../service/cmr.mjs";

export function Granules({ baseUrl, collection }) {
  const [hits, setHits] = useState(0);
  const [granules, setGranules] = useState([]);

  useEffect(() => {
    searchGranules({ baseUrl, collectionId: collection.id }).then((res) => {
      setHits(res.hits);
      setGranules(res.granules);
    });
  }, [baseUrl, collection]);

  return (
    <div>
      <p>Hits: {hits}</p>
      {granules.map((g) => (
        <div key={g.id}>
          {g.id} --- {g.title}
        </div>
      ))}
    </div>
  );
}
