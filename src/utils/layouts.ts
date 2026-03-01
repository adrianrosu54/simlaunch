import type { Layout, Config } from "plotly.js";

export const plotConfig: Partial<Config> = {
    responsive: true, 
    displayModeBar: false,
};

export const sideViewLayout: Partial<Layout> = {
    autosize: true,
    margin: {t: 35, b: 60, l: 60, r: 20},
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",

    font: { family: 'Inter, sans-serif', color: '#64748b' },
    title: {text: "Predicted Trajectory"},

    xaxis: {
        title: {text: "Distance (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        scaleratio: 1,
        fixedrange: true,
        dtick: 0.25,
    },
    yaxis: {
        title: {text: "Height (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        scaleanchor: "x",
        scaleratio: 1,
        fixedrange: true,
        dtick: 0.25,
    },
    hovermode: "closest",
}

export const velocityLayout: Partial<Layout> = {
    ...sideViewLayout,
    title: undefined,
    xaxis: {
        ...sideViewLayout.xaxis,
        title: {text: "Time (s)"},
        scaleratio: undefined,
        scaleanchor: undefined,
        dtick: undefined,
    },
    yaxis: {
        ...sideViewLayout.yaxis,
        title: {text: "Velocity (m/s)"},
        scaleratio: undefined,
        scaleanchor: undefined,
        dtick: undefined,
    }
}

export const accelerationLayout: Partial<Layout> = {
    ...velocityLayout,
    title: undefined,
    yaxis: {
        ...velocityLayout.yaxis,
        title: {text: "Acceleration (m/s^2)"}
    }
}

const lineType = {
    color: "rgba(255, 255, 255, 0.5",
    width: 2,
}

export const FieldLayout: Partial<Layout> = {
    autosize: true,
    margin: {t: 35, b: 60, l: 60, r: 20},
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",

    font: { family: 'Inter, sans-serif', color: '#64748b' },
    title: {text: "Field view"},

    xaxis: {
        title: {text: "x (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        scaleratio: 1,
        fixedrange: true,
        dtick: 0.6096,
    },
    yaxis: {
        title: {text: "y (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        scaleanchor: "x",
        scaleratio: 1,
        fixedrange: true,
        dtick: 0.6096,
        tick0: 0,
    },
    hovermode: "closest",

    shapes: [
        {
            type: "rect", layer: "below",
            xref: "x", yref: "y",
            x0: 0, 
            y0: 0,
            x1: 0.6096*6, 
            y1: 0.6096*6,
            line: lineType,
        },
        { type: "line", layer: "below", x0: 0, y0: 3.6576, x1: 1.8288, y1: 1.8288, line: lineType },
        { type: "line", layer: "below", x0: 3.6576, y0: 3.6576, x1: 1.8288, y1: 1.8288, line: lineType },
        { type: "line", layer: "below", x0: 1.2192, y0: 0, x1: 1.8288, y1: 0.6096, line: lineType },
        { type: "line", layer: "below", x0: 2.4384, y0: 0, x1: 1.8288, y1: 0.6096, line: lineType },
        {
            type: "path", layer: "below",
            xref: "x", yref: "y",
            path: "M 3.6576 1.778 V 3.6576 H 3.048 L 3.5022 3.0226 V 1.778 Z",
            fillcolor: "rgba(220, 38, 38, 0.6)",
            line: {color: "rgb(220, 38, 38, 0.6)", width: 2}
        },
        {
            type: "path", layer: "below",
            xref: "x", yref: "y",
            path: "M 0 1.778 V 3.6576 H 0.635 L 0.1524 3.0226 V 1.778 Z",
            fillcolor: "rgba(37, 99, 235, 0.6)",
            line: {color: "rgb(37, 99, 235, 0.6)", width: 2}
        },
    ]
}