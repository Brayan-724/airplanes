import { Axis, Vec2 } from "@utils";

export class CanvasManager {
  private static _activeCanvas: CanvasManager | null = null;

  private static _getActiveCanvas(): CanvasManager {
    if (CanvasManager._activeCanvas === null)
      throw new Error("No canvas active");

    return CanvasManager._activeCanvas;
  }

  public static get canvas(): HTMLCanvasElement {
    return CanvasManager._getActiveCanvas().canvas;
  }

  public static get ctx(): CanvasRenderingContext2D {
    return CanvasManager._getActiveCanvas().ctx;
  }

  public static createCanvas(width: number, height: number): CanvasManager {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return new CanvasManager(canvas);
  }

  public static clear(): void {
    CanvasManager.ctx.clearRect(
      0,
      0,
      CanvasManager.canvas.width,
      CanvasManager.canvas.height
    );
  }

  public static normalizeSize(n: number, axis: Axis): number {
    const current = CanvasManager._getActiveCanvas();
    const canvas = CanvasManager.canvas;

    const scale = axis === Axis.X ? canvas.width : canvas.height;
    const size = axis === Axis.X ? 1000 : 1000 / current.ratio;

    return (n / size) * scale;
  }

  public static normalizeSizes(vec: Vec2): Vec2 {
    const current = CanvasManager._getActiveCanvas();
    const canvas = CanvasManager.canvas;
    
    const scale = new Vec2(canvas.width, canvas.height);
    const size = new Vec2(1000, 1000 / current.ratio);

    return vec.clone().div(size).mul(scale);
  }

  //* -------------------------------------------------- *
  //* ------------------- Instance --------------------- *
  //* -------------------------------------------------- *

  public readonly ctx: CanvasRenderingContext2D;
  public readonly ratio: number;

  constructor(public readonly canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")!;
    if (ctx === null) throw new Error("Canvas not supported");

    this.ctx = ctx;

    this.ratio = canvas.width / canvas.height;
  }

  activate(): void {
    CanvasManager._activeCanvas = this;
  }

  deactivate(): void {
    CanvasManager._activeCanvas = null;
  }
}
