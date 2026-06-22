import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [{ name: "mui", test: /node_modules\/@mui/ }],
        },
      },
    },
  },
});
