import { useEffect } from "react";

export function EnvironmentSelector({ environment, onSetEnvironment }) {
  useEffect(() => {
    onSetEnvironment("ops");
  }, []);

  function handleChange(event) {
    onSetEnvironment(event.target.value);
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

      <style jsx>{`
        select {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
}
