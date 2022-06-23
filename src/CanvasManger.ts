import { Axis, Vec2 } from "./utils";

export class CanvasManager {
  private static _canvas: HTMLCanvasElement;
  private static _ctx: CanvasRenderingContext2D;

  public static get canvas(): HTMLCanvasElement {
    return CanvasManager._canvas;
  }

  public static get ctx(): CanvasRenderingContext2D {
    return CanvasManager._ctx;
  }

  public static createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  public static init(canvas: HTMLCanvasElement): void {
    CanvasManager._canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("Canvas not supported");
    }
    CanvasManager._ctx = ctx;
  }

  public static clear(): void {
    CanvasManager._ctx.clearRect(
      0,
      0,
      CanvasManager._canvas.width,
      CanvasManager._canvas.height
    );
  }

  public static normalizeSize(n: number, axis: Axis): number {
    const canvas = CanvasManager._canvas;
    const scale = axis === Axis.X ? canvas.width : canvas.height;
    const size = axis === Axis.X ? 1000 : 500;
    return (n / size) * scale;
  }

  public static normalizeSizes(vec: Vec2): Vec2 {
    const canvas = CanvasManager._canvas;
    const scale = new Vec2(canvas.width, canvas.height);
    const size = new Vec2(1000, 500);

    return vec.clone().div(size).mul(scale);
  }
}
