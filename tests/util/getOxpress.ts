import { Generator } from "../../src";
import { defaultGeneratorOptions } from "../../src/config";
import * as ts from "typescript";
import { OpenAPIDocument } from "../../src/generator/Generator";

export async function getOxpress(config: OpenAPIDocument) {
  const generator = new Generator(defaultGeneratorOptions, config);
  eval(ts.transpile(await generator.parse()));

  const { wrap } = module.exports;

  return {
    wrap,
  };
}
