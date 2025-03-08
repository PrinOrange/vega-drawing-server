import * as vega from "vega";
import type { TopLevelSpec } from "vega-lite";
import * as vl from "vega-lite";

export function generateErrorImage(message: string) {
	return `
<svg xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="white"/>
    <text x="50%" y="50%" font-size="24" text-anchor="middle" fill="red" dy=".3em">
			${message}
		</text>
</svg>
`;
}

export async function generateImage(spec: TopLevelSpec): Promise<string> {
	const vegaSpec = vl.compile(spec).spec;
	const view = new vega.View(vega.parse(vegaSpec), {
		renderer: "none",
	});
	const svg: string = await view.toSVG();
	return svg;
}
