import { ConfigOptions, hasExpressOpenApiValidator } from "../../config";
import SwaggerParser from "@apidevtools/swagger-parser";
import { Generator } from "../../generator/Generator";
import { format, resolveConfig } from "prettier";
import { promises as fs } from "fs";

export async function handleGenerate(
  config: ConfigOptions,
  deps: {
    log: (value: string) => void;
    writeFile: (path: string, content: string) => Promise<void>;
    checkHasExpressOpenApiValidator: () => boolean;
  }
) {
  const { log, writeFile, checkHasExpressOpenApiValidator } = deps;
  if (!config.generator.validation) {
    let str: string[] = [
      `ℹ️ The generation of the validation middleware is deactivated. Make sure you handle the validation of input on your own.`,
    ];

    if (!checkHasExpressOpenApiValidator()) {
      str.push(
        `If this is unintentional, make sure you have the "express-openapi-validator" package installed. In case you want to generate the middleware anyway, set the 'validationMiddleware' and 'invokeValidationMiddleware' options to true.`
      );
    }

    log(str.join(" "));
  }

  const validated = await SwaggerParser.validate(config.input);

  const generator = new Generator(config.generator, validated as any);
  const result = await generator.parse();

  const prettierConfig = await resolveConfig(config.output);

  await writeFile(
    config.output,
    format(result, prettierConfig ?? { parser: "typescript" })
  );
}
