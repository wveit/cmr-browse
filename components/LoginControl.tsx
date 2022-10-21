import { useCallback, useEffect, useState } from "react";

/**
 * Application behavior:
 *
 * Environment can be changed... and there is one login status for each environment. In other words,
 * you can be either logged in or logged out for every environment.
 * Ex// I'm logged in for OPS. I switch to UAT, where I never logged in. Now the application considers me logged out.
 *      I log in -> I'm logged in for UAT. I switch back to OPS -> switches to my ops account that I was previously logged in.
 *      I logout, and then switch to UAT. Now I'm logged in with my UAT account, because I previously logged in for UAT.
 *
 *
 * Login status is stored in STATE and in LOCALSTORAGE. These are kept in sync. Therefore a LOCALSTORAGE key for
 * each environment is necessary.
 *
 * Every time I start this component with a given environment, or when the environment changes:
 * - LOCALSTORAGE is checked for token (that matches environment)
 * - An API call is made to get user info and check validity of token
 * - If valid token, STATE is updated with TOKEN and user info
 * - If not valid token, an error message is displayed, with the option to erase the token (logout). Also, the STATE
 *   is left as null, since the token cannot be used for anything.
 *
 * When a user is logged out, the login button will appear. If the login button is clicked, a login modal will appear.
 * The login modal will have a quick link to the generate token page that is appropriate for the environment.
 * The login modal will have a way to enter a token.
 * Once the token is entered, an api call will be made to get user info and check token validity.
 * If valid token, STATE is updated with TOKEN and user info and the modal closes. LOCALSTORAGE also updated with token.
 * If invalid tokeen, STATE and LOCALSTORAGE are not updated. The modal stays open, and displays a message about the invalid token.
 *    The user can either enter a new token and try again, or cancel.
 */

export function LoginControl({ environment }) {
  return null;
}
