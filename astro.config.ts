import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import netlify from "@astrojs/netlify/dist/integration-edge-functions";

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs()],
	output: "server",
	adapter: netlify(),
});
