import { useState, useEffect } from "react";
import { searchVariables } from "../service/cmr";
import { Collection } from "../types/Collection";
import { VariableJson } from "../types/Variable";

export function Variables({
  baseUrl,
  collection,
  token,
}: {
  baseUrl: string;
  collection: Collection | null;
  token: string;
}) {
  const [variables, setVariables] = useState<VariableJson[]>([]);

  useEffect(() => {
    const variableIdList = collection?.associations?.variables || [];
    searchVariables({ baseUrl, variableIdList, token }).then((variables) => {
      setVariables(variables);
    });
  }, [collection, baseUrl, token]);

  return (
    <ol>
      {variables.map((variable) => (
        <Variable key={variable.concept_id} variable={variable} />
      ))}
    </ol>
  );
}

function Variable({ variable }: { variable: VariableJson }) {
  return (
    <li>
      {Object.entries(variable).map(([key, value]) => (
        <div key={key}>{`${key}: ${value}`}</div>
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
