import { useState, useEffect } from "react";
import { searchVariables } from "../service/cmr";

export function VariablesUmm({ baseUrl, collection }) {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const variableIdList = collection?.associations?.variables || [];
    searchVariables({ baseUrl, variableIdList, format: "umm_json" }).then(
      (variables) => {
        setVariables(variables);
      }
    );
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
