import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../.env.json";
import { edlBaseUrl, ensureEnvironmentString } from "../../../../util/util";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const env = ensureEnvironmentString(req.query.env);

  const clientId = config["environment"][env].edlClientId;

  const redirectUri = req.query.redirect_uri || "waka";

  let url = edlBaseUrl(env);
  url += `/oauth/authorize?response_type=code`;
  url += `&client_id=${clientId}`;
  url += `&redirect_uri=${redirectUri}`;

  res.status(301).setHeader("location", url).end();
}
