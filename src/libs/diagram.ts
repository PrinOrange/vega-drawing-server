import * as vega from "vega";
import type { TopLevelSpec } from "vega-lite";
import * as vl from "vega-lite";

export async function generateSVG(spec: TopLevelSpec): Promise<string> {
  const vegaSpec = vl.compile(spec).spec;
  const view = new vega.View(vega.parse(vegaSpec), {
    renderer: "none",
  });
  const svg: string = await view.toSVG();
  view.run().renderer();
  return svg;
}