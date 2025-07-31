import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1", // Use IPv4
    port: 30001, // Use your desired port
  },
  plugins: [react()],
});
