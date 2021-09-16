#!/usr/bin/env node

import { Command } from "commander";
import { promises as fs, watch as fsWatch } from "fs";

import { Generator } from "./generator/Generator";
import SwaggerParser from "@apidevtools/swagger-parser";
import { resolveConfig, format } from "prettier";
import { CommandOptions, ConfigOptions, getConfig } from "./config";

const program = new Command();
program
  .command("generate")
  .option("-o, --out <outPath>", "The desired path for the output file.")
  .option(
    "-s, --swagger <swaggerPath>",
    "The input swagger file to generate from."
  )
  .option("-c, --config <configPath>", "The config file.")
  .option("-w, --watch", "Start generator in watch mode")
  .action(async (commandParams: Partial<CommandOptions>) => {
    const config = getConfig(commandParams);

    if (commandParams.watch === true) {
      runInWatchMode(config);
    } else {
      await run(config);
    }
  })
  .parse(process.argv);

async function runInWatchMode(config: ConfigOptions) {
  let timeout: any;
  let currentRun: Promise<void> | undefined;

  console.log(`Watching for changes in "${config.swagger}"`);
  const onChange = () => {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
    console.log(`Generating "${config.out}"`);

    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      await currentRun;

      currentRun = Promise.resolve().then(async () => {
        try {
          await run(config);
          console.log("✅ Generated successfully");
        } catch (e: any) {
          console.log(`❌ Failed to regenerate: ${e.message}`);
        }
      });
    }, 500);
  };

  onChange();
  fsWatch(config.swagger, onChange);
}

async function run(config: ConfigOptions) {
  const validated = await SwaggerParser.validate(config.swagger);

  console.log(JSON.stringify(validated, null, 2));

  const generator = new Generator(config.generator, validated as any);
  const result = await generator.parse();

  const prettierConfig = await resolveConfig(config.out);

  await fs.writeFile(
    config.out,
    format(result, prettierConfig ?? { parser: "typescript" })
  );
}
