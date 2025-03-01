import { Hono } from "hono";
import type { TopLevelSpec } from "vega-lite";
import { generateErrorImage, generateImage } from "./libs/diagram";
import { decode } from "./libs/encode";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/:encoded", async (c) => {
	try {
		const encoded = c.req.param("encoded");
		const decoded = decode(encoded);
		const parsedSpec = JSON.parse(decoded) as TopLevelSpec;
		const svg = await generateImage(parsedSpec);

		return c.text(svg, 200, { "Content-Type": "image/svg+xml" });
	} catch (e: any) {
		return c.text(generateErrorImage(e), 200, {
			"Content-Type": "image/svg+xml",
		});
	}
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
