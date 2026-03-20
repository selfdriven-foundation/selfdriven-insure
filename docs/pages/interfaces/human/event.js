// selfdriven.insure — site configuration
// Loaded via <script src="./event.js"> — works on file://, localhost, and Jekyll.
// No CORS issues because script tags bypass same-origin restrictions.
//
// SECURITY: Do NOT commit this file to a public git repository.
// Add event.js to your .gitignore.
// This file should only exist locally or on a private server.

window.__SD_CONFIG__ = {
  ai: {
    service: {
      claude: {
        privatekey: "sk-ant-api03-YOUR_KEY_HERE"
      }
    }
  },
  keri: {
    aid: "EKE4g_0hDGBOqDLKzNBT3kFOPxoP7wXkqt",
    witnesses: 3
  },
  insure: {
    abr_guid: "dd0305c0-768a-40a0-aa54-78acd28cebeb",
    default_state: "NSW",
    default_remoteness: "metro"
  }
};
