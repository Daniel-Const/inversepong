export const drawBoundaryLine = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
};

export const drawBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
) => {
    const gridSpace = 20;

    for (let x = 0; x < width; x += gridSpace) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    for (let y = 0; y < height; y += gridSpace) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.stroke();
};
