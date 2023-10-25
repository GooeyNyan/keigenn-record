import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        sourcemap: false,
        manualChunks(id, { getModuleInfo }) {
          if (id.includes("src/constants/actionName")) {
            return "actionName";
          }
          if (id.includes("src/constants/status")) {
            return "status";
          }
          if (id.includes("src/constants/keigenns")) {
            return "keigenns";
          }
          if (id.includes("antd")) {
            return "antd";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
          const reg = /(.*)\/src\/(.*)/;
          if (reg.test(id)) {
            const importersLen = getModuleInfo(id).importers.length;
            if (importersLen > 1) {
              return "common";
            }
          }
        },
      },
    },
  },
});
