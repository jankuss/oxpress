import * as path from "path";
import { GeneratorConfig } from "./generator/types";
import deepMerge from "deepmerge";

export function getConfig(commandParams: Partial<CommandOptions>) {
  let configFileContent: DeepPartial<ConfigOptions>;
  configFileContent = require(path.resolve(
    commandParams.config ?? defaultConfigPath
  ));

  return [defaultConfig, configFileContent, commandParams].reduce((a, b) =>
    deepMerge(a, b)
  ) as ConfigOptions;
}

const defaultConfigPath = "./oxpress.config.js";

export const defaultGeneratorOptions: GeneratorConfig = {
  validationMiddleware: true,
  invokeValidationMiddleware: true,
  validatorOptions: { validateResponses: true, validateRequests: true },
};

const defaultConfig: ConfigOptions = {
  generator: defaultGeneratorOptions,
  out: "./oxpress.generated.ts",
  swagger: "./swagger.yaml",
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface CommonOptions {
  out: string;
  swagger: string;
}

export interface CommandOptions extends CommonOptions {
  config: string;
  watch?: boolean;
}

export interface ConfigOptions extends CommonOptions {
  generator: GeneratorConfig;
}
