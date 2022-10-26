import { ChangeEvent, useEffect } from "react";
import { Environment } from "../types";

export function EnvironmentSelector({
  environment,
  onSetEnvironment,
  token,
  onSetToken,
}: {
  environment: Environment;
  onSetEnvironment: (env: Environment) => void;
  token: string;
  onSetToken: (token: string) => void;
}) {
  useEffect(() => {
    onSetEnvironment("ops");
  }, []);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value === "ops" || value === "uat" || value === "sit")
      onSetEnvironment(value);
  }

  return (
    <div>
      <label>
        Select Environment
        <select value={environment} onChange={handleChange}>
          <option value="ops">ops</option>
          <option value="uat">uat</option>
          <option value="sit">sit</option>
        </select>
      </label>
      <br />
      <label>
        Token{" "}
        <input value={token} onChange={(evt) => onSetToken(evt.target.value)} />
      </label>

      <style jsx>{`
        select {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
}
