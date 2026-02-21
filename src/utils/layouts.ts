import type { Layout, Config } from "plotly.js";

export const sideViewLayout: Partial<Layout> = {
    autosize: true,
    margin: {t: 40, b: 60, l: 60, r: 20},
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",

    font: { family: 'Inter, sans-serif', color: '#64748b' },
    title: {text: "Predicted Trajectory"},

    xaxis: {
        title: {text: "Distance (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        showgrid: true,
        scaleanchor: "x",
        scaleratio: 1,
        fixedrange: true,
    },
    yaxis: {
        title: {text: "Height (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        scaleanchor: "x",
        scaleratio: 1,
        fixedrange: true,
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
    },
    yaxis: {
        ...sideViewLayout.yaxis,
        title: {text: "Velocity (m/s)"},
        scaleratio: undefined,
        scaleanchor: undefined,
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

export const plotConfig: Partial<Config> = {
    responsive: true, 
    displayModeBar: false,
};