"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { type BlogVizId } from "./blog-viz-ids";

/**
 * Each article widget is its own client chunk. `next/dynamic` still
 * pre-renders the widget on the server, and the browser only downloads the
 * chunks for markers that are actually in the article.
 */
const VIZ_WIDGETS: Record<BlogVizId, ComponentType> = {
  "kano-overview": dynamic(() =>
    import("./kano/KanoCategoryOverview").then((mod) => mod.KanoCategoryOverview),
  ),
  "kano-curve": dynamic(() =>
    import("./kano/KanoCurveExplorer").then((mod) => mod.KanoCurveExplorer),
  ),
  "kano-shift": dynamic(() =>
    import("./kano/KanoExpectationShift").then((mod) => mod.KanoExpectationShift),
  ),
  "route-check": dynamic(() =>
    import("./route-check/RouteCheckCalculator").then((mod) => mod.RouteCheckCalculator),
  ),
  "grouping-proximity": dynamic(() =>
    import("./grouping/ProximityExplorer").then((mod) => mod.ProximityExplorer),
  ),
  "grouping-similarity": dynamic(() =>
    import("./grouping/SimilarityExplorer").then((mod) => mod.SimilarityExplorer),
  ),
  "grouping-common-region": dynamic(() =>
    import("./grouping/CommonRegionExplorer").then((mod) => mod.CommonRegionExplorer),
  ),
  "grouping-connectedness": dynamic(() =>
    import("./grouping/ConnectednessExplorer").then((mod) => mod.ConnectednessExplorer),
  ),
};

export function BlogViz({ id }: { id: BlogVizId }) {
  const Widget = VIZ_WIDGETS[id];
  return <Widget />;
}
