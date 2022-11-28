import express from "express";
import axios, { AxiosError } from "axios";

const router = express.Router();

import config from "../.env.json";
import { edlBaseUrl, ensureEnvironmentString, queryString } from "../util/util";

router.get("/:env/auth/authorize", (req, res) => {
  const env = ensureEnvironmentString(req.params.env);
  const clientId = config["environment"][env].edlClientId;
  const redirectUri = req.query.redirect_uri || "waka";

  let url = edlBaseUrl(env);
  url += `/oauth/authorize?response_type=code`;
  url += `&client_id=${clientId}`;
  url += `&redirect_uri=${redirectUri}`;

  res.redirect(url);
});

router.post("/:env/auth/token", async (req, res) => {
  const env = ensureEnvironmentString(req.params.env);
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
});

function combine(id: string, password: string): string {
  return btoa(`${id}:${password}`);
}

export default router;
