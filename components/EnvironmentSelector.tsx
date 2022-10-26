import { ChangeEvent, useEffect } from "react";
import { Environment } from "../types";

export function EnvironmentSelector({
  environment,
}: {
  environment: Environment;
}) {
  return <div>({environment})</div>;
}
