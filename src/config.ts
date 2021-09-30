import * as path from "path";
import { GeneratorConfig } from "./generator/types";
import deepMerge from "deepmerge";

export const hasExpressOpenApiValidator = () => {
  try {
    require("express-openapi-validator");
    return true;
  } catch (e) {
    return false;
  }
};

export function getConfig(commandParams: Partial<CommandOptions>) {
  let configFileContent: DeepPartial<ConfigOptions> = {};

  try {
    configFileContent = require(path.resolve(
      commandParams.config ?? defaultConfigPath
    ));
  } catch (e) {}

  const defaultConfigWithOverrides = getDefaultConfigWithEnvironmentOverrides();

  return [defaultConfigWithOverrides, configFileContent, commandParams].reduce(
    (a, b) => deepMerge(a, b)
  ) as ConfigOptions;
}

const defaultConfigPath = "./oxpress.config.js";

export const defaultGeneratorOptions: GeneratorConfig = {
  validation: true,
  autoInvokeValidationMiddleware: true,
};

export const defaultConfig: ConfigOptions = {
  generator: defaultGeneratorOptions,
  output: "./oxpress.generated.ts",
  input: "./swagger.yaml",
};

function getDefaultConfigWithEnvironmentOverrides() {
  if (!hasExpressOpenApiValidator()) {
    return deepMerge(defaultConfig, {
      generator: {
        validationMiddleware: false,
        invokeValidationMiddleware: false,
      },
    });
  }

  return defaultConfig;
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface CommonOptions {
  output: string;
  input: string;
}

export interface CommandOptions extends CommonOptions {
  config: string;
  watch?: boolean;
}

export interface ConfigOptions extends CommonOptions {
  generator: GeneratorConfig;
}
