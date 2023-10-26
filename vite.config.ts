import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    rollupOptions: {
      output: {
        sourcemap: false,
        manualChunks(id, { getModuleInfo }) {
          if (
            id.includes("src/constants/actionName") ||
            id.includes("node_modules")
          ) {
            return "vendor";
          }
          // const reg = /(.*)\/src\/(.*)/;
          // if (reg.test(id)) {
          //   const importersLen = getModuleInfo(id).importers.length;
          //   if (importersLen > 1) {
          //     return "common";
          //   }
          // }
        },
      },
    },
  },
});
