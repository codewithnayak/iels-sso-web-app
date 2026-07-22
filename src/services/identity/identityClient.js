export const identityClient = {
  startSession: (idToken, accessToken) => {
    return fetch("https://identity.iels.com/session/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken, accessToken }),
    });
  },
};
