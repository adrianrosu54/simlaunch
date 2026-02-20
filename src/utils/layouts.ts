import type { Layout, Config } from "plotly.js";

export const sideViewLayout: Partial<Layout> = {
    autosize: true,
    margin: {t: 40, b: 60, l: 60, r: 20},
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",

    font: { family: 'Inter, sans-serif', color: '#64748b' },

    xaxis: {
        title: {text: "Distance (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        showgrid: true,
    },
    yaxis: {
        title: {text: "Height (m)"},
        gridcolor: "#334155",
        zerolinecolor: "#334155",
        scaleanchor: "x",
        scaleratio: 1
    },
    hovermode: "closest",
}

export const plotConfig: Partial<Config> = {
    responsive: true, 
    displayModeBar: false
};