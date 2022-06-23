import { GetPath, GetValue, objGet, objSet } from "./utils";

export class ConfigManager<Config extends {}> {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  get<P extends GetPath<Config>>(path: P): GetValue<Config, P> {
    return objGet(this.config, path);
  }

  set<P extends GetPath<Config>>(path: P, value: GetValue<Config, P>): this {
    objSet(this.config, path, value);
    return this;
  }

  getConfig(): Config {
    return Object.assign({}, this.config);
  }

  getFrezedConfig(): Readonly<Config> {
    return Object.freeze(this.getConfig());
  }

  private static configs = new Map<string, ConfigManager<any>>();

  static setConfig<Config extends {}>(
    configName: string,
    config: Config
  ): ConfigManager<Config> {
    if (ConfigManager.configs.has(configName))
      throw new Error(`Config ${configName} already exists`);

    const configManager = new ConfigManager<Config>(config);

    ConfigManager.configs.set(configName, configManager);

    return configManager;
  }

  static getConfig<Config extends {}>(
    configName: string
  ): ConfigManager<Config> {
    if (!ConfigManager.configs.has(configName))
      throw new Error(`Config ${configName} not found`);

    return ConfigManager.configs.get(configName)!;
  }
}
