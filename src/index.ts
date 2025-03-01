import { Hono } from "hono";
import type { TopLevelSpec } from "vega-lite";
import { generateSVG } from "./libs/diagram";
import { decode } from "./libs/encode";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/:encoded", async (c) => {
	const encoded = c.req.param("encoded");
	const decoded = decode(encoded);
	const parsedSpec = JSON.parse(decoded) as TopLevelSpec;
	const svg = await generateSVG(parsedSpec);

	return c.text(svg, 200, { "Content-Type": "image/svg+xml" });
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
