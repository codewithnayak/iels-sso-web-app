import { PublicClientApplication } from "@azure/msal-browser";
const redirectUri = import.meta.env.VITE_AZURE_REDIRECT_URI;

console.log("AZURE_REDIRECT_URI =", import.meta.env.VITE_AZURE_REDIRECT_URI);
console.log("AZURE_RETURN_URL =", import.meta.env.VITE_AZURE_RETURN_URL);
export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "7fcaf705-a031-469e-b81d-2b4bac8f6cb2",
    authority:
      "https://login.microsoftonline.com/6c4bd166-980d-42cd-8e07-eaa82d26b24f",
    redirectUri: redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
});
