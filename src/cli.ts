#!/usr/bin/env node

import { Command } from "commander";
import { promises as fs } from "fs";
import { Generator } from "./generator/Generator";
import * as SwaggerParser from "@apidevtools/swagger-parser";
import { resolveConfig, format } from "prettier";
import * as vm from "vm";
import * as path from "path";
import { GeneratorConfig } from "./generator/types";
import * as deepMerge from "deepmerge";
import { CommandOptions, getConfig } from "./config";

const program = new Command();
program
  .command("generate")
  .option("-o, --out <outPath>", "The desired path for the output file.")
  .option(
    "-s, --swagger <swaggerPath>",
    "The input swagger file to generate from."
  )
  .option("-c, --config <configPath>", "The config file.")
  .action(async (commandParams: Partial<CommandOptions>) => {
    const config = getConfig(commandParams);

    const validated = await SwaggerParser.validate(config.swagger);
    const generator = new Generator(config.generator, validated as any);
    const result = await generator.parse();

    const prettierConfig = await resolveConfig(config.out);

    await fs.writeFile(
      config.out,
      format(result, prettierConfig ?? { parser: "typescript" })
    );
  })
  .parse(process.argv);
