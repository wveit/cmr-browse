import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Environment } from "../types";

export function EnvironmentSelector({
  environment,
}: {
  environment: Environment;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="EnvironmentSelector">
      <button onClick={() => setShow(!show)}>({environment}) ▼</button>
      <div className={"dropdown" + (show ? "" : " hidden")}>
        <Link href="/">ops</Link>
        <Link href="/uat">uat</Link>
        <Link href="/sit">sit</Link>
      </div>

      <style jsx>{`
        .EnvironmentSelector {
          position: relative;
        }
        .dropdown {
          position: absolute;
          background-color: rgb(245, 245, 245);
          border: 1px solid gray;
          width: 100%;
        }
        .dropdown > :global(*) {
          display: block;
        }

        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
}
