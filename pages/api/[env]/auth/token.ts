import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../.env.json";
import {
  edlBaseUrl,
  ensureEnvironmentString,
  queryString,
} from "../../../../util/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const env = ensureEnvironmentString(req.query.env);
  const clientId = config["environment"][env].edlClientId;
  const clientPassword = config["environment"][env].edlClientPassword;

  const redirect_uri = req.body.redirectUri;
  const code = req.body.code;
  const grant_type = "authorization_code";

  let url = edlBaseUrl(env) + `/oauth/token`;
  const body = queryString({ redirect_uri, code, grant_type });
  const headers = {
    Authorization: `Basic ${combine(clientId, clientPassword)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let edlResponse = await axios({
    method: "post",
    url,
    headers,
    data: body,
  }).catch((error: AxiosError) => error.response);

  console.log("===========\nTokenRequest\n==============");
  console.log(url, headers, body);
  console.log("===========\nTokenResponse\n==============");
  console.log(edlResponse?.status, edlResponse?.statusText, edlResponse?.data);

  res.json({ tokenData: edlResponse?.data });
}

function combine(id: string, password: string): string {
  return btoa(`${id}:${password}`);
}
