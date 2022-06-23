import { ConfigManager } from "@managers";
import { Vec2 } from "./utils/Vec2";

export enum CellType {
  Empty = "empty",
  Motor = "motor",
  Wing = "wing",
  Tail = "tail",
  Body = "body",
}

export interface CellConfigColors {
  types: {
    [T in CellType]: string;
  };

  hidden: string;
}

export interface CellConfig {
  size: number;
  colors: CellConfigColors;
}

export class Cell {
  private _opened: boolean = false;
  private cellConfig: CellConfig =
    ConfigManager.getConfig<CellConfig>("cell").getFrezedConfig();
  constructor(public readonly type: CellType, public readonly position: Vec2) {}

  public getColor(): string {
    if (this.getOpened()) {
      return this.cellConfig.colors.types[this.type];
    }

    return this.cellConfig.colors.hidden;
  }

  public getOpened(): boolean {
    return this._opened;
  }

  public setOpened(opened: boolean): void {
    this._opened = opened;
  }
}
