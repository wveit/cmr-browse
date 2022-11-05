// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../.env.json";
console.log(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const env = getEnvString(req.query.env);
  const blah = env === "ops" ? "" : `${env}.`;

  const clientId = config["environment"][env].edlClientId;
  const clientPassword = config["environment"][env].edlClientPassword;

  const reqBody = JSON.parse(JSON.stringify(req.body));
  console.log("body: ", reqBody);
  console.log("code: ", reqBody.code);
  const redirect_uri = reqBody.redirectUri;
  const code = reqBody.code;
  const grant_type = "authorization_code";

  let url = `https://${blah}urs.earthdata.nasa.gov/oauth/token`;
  const body = { redirect_uri, code, grant_type };
  const headers = {
    Authorization: `Basic ${combine(clientId, clientPassword)}`,
  };

  // const edlResponse = await axios({ method: "post", url, headers });
  // res.json(edlResponse);
  console.log(url, headers, body);
  res.json({ greeting: "hello" });
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

function combine(id: string, password: string): string {
  return btoa(`${id}:${password}`);
}
