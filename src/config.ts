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

export function getConfig(
  commandParams: Partial<CommandOptions>,
  deps: {
    hasExpressOpenApiValidator: () => boolean;
    requireConfigFile: (path: string) => any;
  }
) {
  let configFileContent: DeepPartial<ConfigOptions> = {};

  try {
    configFileContent = deps.requireConfigFile(
      path.resolve(commandParams.config ?? defaultConfigPath)
    );
  } catch (e) {}

  const defaultConfigWithOverrides =
    getDefaultConfigWithEnvironmentOverrides(deps);

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
  input: "./openapi.yaml",
};

function getDefaultConfigWithEnvironmentOverrides(deps: {
  hasExpressOpenApiValidator: () => boolean;
}) {
  if (!deps.hasExpressOpenApiValidator()) {
    return deepMerge(defaultConfig, {
      generator: {
        validation: false,
        autoInvokeValidationMiddleware: false,
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
