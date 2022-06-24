import { CanvasManager } from "@managers";
import { Panel } from "src/Panel";

export class PanelUI {
  private canvas = CanvasManager.createCanvas(1000, 1000);

  public get canvasElement(): HTMLCanvasElement {
    return this.canvas.canvas;
  }

  public activate(): void {
    this.canvas.activate();
  }

  public deactivate(): void {
    this.canvas.deactivate();
  }

  public draw(panel: Panel): void {
    this.activate();
    panel.draw();
  }
}
