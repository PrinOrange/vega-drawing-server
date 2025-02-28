import { Hono } from "hono";
import type { TopLevelSpec } from "vega-lite";
import { generateSVG } from "./libs/diagram";
import { decode } from "./libs/encode";

const app = new Hono();

app.get("/vega-lite/:encoded", async (c) => {
	const encoded = c.req.param("encoded");
	const decoded = decode(encoded);
	const parsedSpec = JSON.parse(decoded) as TopLevelSpec;
	const svg = await generateSVG(parsedSpec);

	return c.text(svg, 200, { "Content-Type": "image/svg+xml" });
});

export default app;
