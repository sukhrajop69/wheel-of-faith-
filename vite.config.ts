import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const repoName = "REPO_NAME_HERE"; // <-- set this to your GitHub repo name EXACTLY

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Wheel of Fate",
        short_name: "WheelOfFate",
        description: "Branching spin-the-wheel character generator.",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: `/${repoName}/`,
        scope: `/${repoName}/`
      }
    })
  ]
});
