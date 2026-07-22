import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { msalInstance } from "./services/identity/authConfig";
import { identityClient } from "./services/identity/identityClient";
const retrunUrl = import.meta.env.VITE_AZURE_RETURN_URL;
const root = ReactDOM.createRoot(document.getElementById("root"));

async function start() {
  // REQUIRED FIX: initialize MSAL first
  await msalInstance.initialize();

  const response = await msalInstance.handleRedirectPromise();

  if (response) {
    const idToken = response.idToken;
    const accessToken = response.accessToken;

    const returnUrl = sessionStorage.getItem("returnUrl") || retrunUrl;

    //enable it later once the identity manager service is written
    //await identityClient.startSession(idToken, accessToken);

    //sessionStorage.removeItem("returnUrl");
    console.log(retrunUrl);
    window.location.href = returnUrl;
    return;
  }

  root.render(<App />);
}

start();
