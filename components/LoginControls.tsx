import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Environment } from "../types";

export function LoginControls({
  token,
  onSetToken,
  environment,
}: {
  token: string;
  onSetToken: (token: string) => void;
  environment: Environment;
}) {
  // if logout button clicked, call onSetToken() and remove from localstorage
  // if login buttton clicked, do login process

  const router = useRouter();

  const localStorageKey = `${environment}-token`;
  function handleLogin() {
    window.location.href = getAuthorizationUrl(environment);
  }

  function handleLogout() {}

  useEffect(() => {
    // if there's a code in the url, remove it from url and swap it for a token/uid. store it in localstorage for the environment, call onSetToken()
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    console.log("code: ", code);
    const base = url.href.split(/[?#]/)[0];
    console.log("base: ", base);

    if (code) {
      console.log("removing code");
      router.push(base);
      login(environment, code, base).then(console.log);
    }

    // if there's a token/uid in localstorage for the environment, get it out and call onSetToken()
  }, []);

  if (!token)
    return (
      <button className="LoginControls" onClick={handleLogin}>
        Login
      </button>
    );

  return (
    <button className="LoginControls" onClick={handleLogout}>
      Logout
    </button>
  );
}

function getAuthorizationUrl(env: Environment): string {
  const redirectUri = window.location.href.split("?")[0];
  return `/api/${env}/auth/authorize?redirect_uri=${redirectUri}`;
}

function login(env: Environment, code: string, redirectUri: string) {
  const url = `/api/${env}/auth/token`;
  const body = {
    code,
    redirectUri,
  };
  console.log("sending ", body);
  return axios({ method: "post", url, data: body });
}
