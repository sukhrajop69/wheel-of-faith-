import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const repoName = "wheel-of-fate"; // <-- CHANGE to your GitHub repo name

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
        scope: `/${repoName}/`,
        icons: [
          {
            src: `/${repoName}/icons/icon-192.png`,
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: `/${repoName}/icons/icon-512.png`,
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: `/${repoName}/icons/maskable-192.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: `/${repoName}/icons/maskable-512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
});
