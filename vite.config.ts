import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import pkg from "./package.json";

const dependencies = pkg.dependencies;

export default defineConfig({
   
    plugins: [
    react(),
    federation({
      name: "microapp",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: {
        react: {
          import: true,
          requiredVersion: dependencies.react,
          version: dependencies.react,
        },
        "react-dom": {
          import: true,
          requiredVersion: dependencies["react-dom"],
          version: dependencies["react-dom"],
        },
        i18next: {
          import: true,
          requiredVersion: dependencies.i18next,
          version: dependencies.i18next,
        },
      },
    })
  ],

  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js", // ⚡ evita que remoteEntry se vaya a /assets/
      },
    },
  },

  server: {
    cors: true, // habilita CORS para todos los orígenes
    host: true 
  },

  preview: {
    cors: true
  }
});