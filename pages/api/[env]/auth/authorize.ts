// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../.env.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const env = getEnvString(req.query.env);
  const blah = env === "ops" ? "" : `${env}.`;

  const clientId = config["environment"][env].edlClientId;

  const redirectUri = req.query.redirect_uri || "waka";

  let url = `https://${blah}urs.earthdata.nasa.gov/oauth/authorize?response_type=code`;
  url += `&client_id=${clientId}`;
  url += `&redirect_uri=${redirectUri}`;

  res.status(301).setHeader("location", url).end();
}

function getString(input: string | string[] | undefined): string {
  if (!input) return "";
  if (Array.isArray(input)) return input[0];
  return input;
}

function getEnvString(
  input: string | string[] | undefined
): "ops" | "uat" | "sit" {
  input = getString(input);
  if (input === "sit") return "sit";
  if (input === "uat") return "uat";
  return "ops";
}
