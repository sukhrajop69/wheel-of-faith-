import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const repoName = "wheel-of-faith-"; // EXACT repo name

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Wheel of Fate",
        short_name: "WheelOfFate",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: `/${repoName}/`,
        scope: `/${repoName}/`
      }
    })
  ]
});
