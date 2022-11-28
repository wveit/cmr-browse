import { Environment } from "../types";

export class EdlClient {
  constructor(env: Environment, clientId: string, clientPassword: string) {}

  createAuthorizationUrl(redirectUri: string): string {
    return "";
  }

  async getToken(redirectUri: string, authCode: string) {
    return { access_token: "", refresh_token: "", endpoint: "" };
  }
}
