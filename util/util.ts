import { Environment } from "../types";

export function edlBaseUrl(env: string): string {
  const blah = env === "ops" ? "" : `${env}.`;
  return `https://${blah}urs.earthdata.nasa.gov`;
}

export function queryString(obj: Record<string, string>): string {
  let output = "";
  Object.keys(obj).forEach((key) => {
    output += `${key}=${obj[key]}&`;
  });
  return output.slice(0, output.length - 1);
}

function getString(input: string | string[] | undefined): string {
  if (!input) return "";
  if (Array.isArray(input)) return input[0];
  return input;
}

export function ensureEnvironmentString(
  input: string | string[] | undefined
): Environment {
  input = getString(input);
  if (input === "sit") return "sit";
  if (input === "uat") return "uat";
  return "ops";
}
