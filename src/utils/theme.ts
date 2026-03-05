const resolveColor = (query: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(query).trim();
}

const toRgba = (cssColor: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) return `rgba(0, 0, 0, 0)`;

    ctx.fillStyle = cssColor;
    ctx.fillRect(0, 0, 1, 1);
  
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
};

export const graphText = toRgba(resolveColor("--color-clk-text-graph"));