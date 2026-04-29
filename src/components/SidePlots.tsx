import { lazy, Suspense } from "react";
const Plot = lazy(() => import("react-plotly.js"));
import { useStore } from "@nanostores/react";

import { sideViewLayout, plotConfig, velocityLayout, accelerationLayout } from "../utils/layouts.ts";
import { $simLogs } from "../stores/physics.ts";
import Card from "./Card.tsx";
import { useMediaQuery } from "../hooks/useMediaQuery.ts";
import { $view } from "../stores/settings.ts";
import { blueColor, greenColor, yellowColor } from "../utils/theme.ts";
import Loading from "./Loading.tsx";

export default function SidePlots() {
    const isMobile = useMediaQuery("(max-width: 784px)");
    const view = useStore($view);

    const simulationData = useStore($simLogs);

    if (isMobile && view !== "side")
        return null;

    return (
        <section className="relative col-span-2 row-span-2 grid grid-cols-2 grid-rows-3 gap-2">
            <Card className="order-3 col-span-2 row-span-2">
                <Suspense fallback={<Loading />}>
                    <Plot
                        data={[
                            {
                                x: simulationData.map(p => p.distance),
                                y: simulationData.map(p => p.height),
                                type: "scatter",
                                mode: "lines",
                                name: "side view",
                                line: {
                                    color: blueColor,
                                    width: 2,
                                    shape: "spline",
                                },
                            }
                        ]}
                        layout={sideViewLayout} config={plotConfig}
                        useResizeHandler={true}
                        style={{ height: "100%" }}
                        className="min-w-0 min-h-0 relative" />
                </Suspense>
            </Card>

            <Card>
                <Suspense fallback={<Loading />}>
                    <Plot
                        data={[
                            {
                                x: simulationData.map(p => p.time),
                                y: simulationData.map(p => p.velocity),
                                type: "scatter",
                                mode: "lines",
                                name: "velocity",
                                line: {
                                    color: greenColor,
                                    width: 2,
                                    shape: "spline",
                                }
                            }
                        ]}
                        layout={velocityLayout} config={plotConfig}
                        useResizeHandler={true}
                        style={{ height: "100%" }}
                        className="max-h-100 relative" />
                </Suspense>
            </Card>

            <Card>
                <Suspense fallback={<Loading />}>
                    <Plot
                        data={[
                            {
                                x: simulationData.map(p => p.time),
                                y: simulationData.map(p => p.acceleration),
                                type: "scatter",
                                mode: "lines",
                                name: "acceleration",
                                line: {
                                    color: yellowColor,
                                    width: 2,
                                    shape: "spline",
                                }
                            }
                        ]}
                        layout={accelerationLayout} config={plotConfig}
                        useResizeHandler={true}
                        style={{ height: "100%" }}
                        className="max-h-100 relative"
                    />
                </Suspense>
            </Card>
        </section>
    );
}
