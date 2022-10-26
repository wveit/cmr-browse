import { useState, useEffect } from "react";
import { searchVariables } from "../service/cmr";
import { Collection } from "../types/Collection";
import { VariableUmmJson } from "../types/Variable";

export function VariablesUmm({
  baseUrl,
  collection,
  token,
}: {
  baseUrl: string;
  collection: Collection | null;
  token: string;
}) {
  const [variables, setVariables] = useState<VariableUmmJson[]>([]);

  useEffect(() => {
    const variableIdList = collection?.associations?.variables || [];
    searchVariables({
      baseUrl,
      variableIdList,
      token,
      format: "umm_json",
    }).then((variables) => {
      setVariables(variables);
    });
  }, [collection, baseUrl, token]);

  return (
    <ol>
      {variables.map((variable) => (
        <Variable key={variable.meta["concept-id"]} variable={variable} />
      ))}
    </ol>
  );
}

function Variable({ variable }: { variable: VariableUmmJson }) {
  return (
    <div>
      <pre>{JSON.stringify(variable, null, 2)}</pre>
      <style jsx>{`
        div {
          padding: 1rem;
          border: 1px solid black;
          margin-bottom: 1rem;
          background-color: beige;
        }
      `}</style>
    </div>
  );
}
