#!/usr/bin/env node

import { Command } from "commander";

import { commandGenerate } from "./commands/generate/commandGenerate";
import { commandInit } from "./commands/init/commandInit";

const program = new Command();
program
  .command("generate")
  .option("-o, --output <outPath>", "The desired path for the output file.")
  .option("-i, --input <inputPath>", "The input OpenAPI file to generate from.")
  .option("-c, --config <configPath>", "The config file.")
  .option("-w, --watch", "Start generator in watch mode")
  .action(commandGenerate);

program.command("init").option("--skip-deps").action(commandInit);

program.parse(process.argv);
