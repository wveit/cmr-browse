import { useState, useEffect } from "react";

export function Variables({ baseUrl, collection }) {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    fetchVariablesData(baseUrl, collection.associations.variables || []).then(
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

async function fetchVariablesData(baseUrl, variableIdList) {
  const variablesData = [];
  const promises = [];
  for (let id of variableIdList) {
    const url = `${baseUrl}/search/variables.json?concept_id=${id}`;
    promises.push(fetch(url));
  }

  for (let index in variableIdList) {
    const promise = promises[index];
    const id = variableIdList[index];

    try {
      const data = await promise.then((res) => res.json());
      variablesData.push(data.items[0]);
    } catch {
      variablesData.push({ concept_id: id, status: "error" });
    }
  }

  return variablesData;
}
