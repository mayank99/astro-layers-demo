import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";

// @ts-ignore
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs()],
	output: "server",
	adapter: netlify(),
});
