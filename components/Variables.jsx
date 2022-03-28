import { useState, useEffect } from "react";
import { searchVariables } from "../service/cmr";

export function Variables({ baseUrl, collection }) {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const variableIdList = collection?.associations?.variables || [];
    searchVariables({ baseUrl, variableIdList }).then((variables) => {
      setVariables(variables);
    });
  }, [collection, baseUrl]);

  return (
    <ol>
      {variables.map((variable) => (
        <Variable key={variable.concept_id} variable={variable} />
      ))}
    </ol>
  );
}

function Variable({ variable }) {
  return (
    <li>
      {Object.entries(variable).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
      <style jsx>{`
        li {
          padding: 1rem;
          border: 1px solid black;
          margin-bottom: 1rem;
          background-color: beige;
        }
      `}</style>
    </li>
  );
}
