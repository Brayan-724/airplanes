import { ConfigManager } from "./ConfigManager";

export interface PanelConfig {
  size: number,
}

export abstract class Panel {
  private config: PanelConfig;

  constructor() {
    this.config = ConfigManager.getConfig<PanelConfig>("panel").getFrezedConfig();
  }
}
