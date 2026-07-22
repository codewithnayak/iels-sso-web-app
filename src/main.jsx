import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { msalInstance } from "./services/identity/authConfig";
import { identityClient } from "./services/identity/identityClient";
const redirectUri = import.meta.env.AZURE_REDIRECT_URI;
const root = ReactDOM.createRoot(document.getElementById("root"));

async function start() {
  // REQUIRED FIX: initialize MSAL first
  await msalInstance.initialize();

  const response = await msalInstance.handleRedirectPromise();

  if (response) {
    const idToken = response.idToken;
    const accessToken = response.accessToken;

    const returnUrl = sessionStorage.getItem("returnUrl") || redirectUri;

    await identityClient.startSession(idToken, accessToken);

    sessionStorage.removeItem("returnUrl");
    window.location.href = returnUrl;
    return;
  }

  root.render(<App />);
}

start();
