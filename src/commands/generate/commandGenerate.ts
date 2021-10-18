import {
  CommandOptions,
  ConfigOptions,
  getConfig,
  hasExpressOpenApiValidator,
} from "../../config";
import { promises as fs, watch as fsWatch } from "fs";
import { handleGenerate } from "./handleGenerate";

export const commandGenerate = async (
  commandParams: Partial<CommandOptions>
) => {
  const config = getConfig(commandParams, {
    requireConfigFile: (path) => require(path),
    hasExpressOpenApiValidator: hasExpressOpenApiValidator,
  });

  if (commandParams.watch === true) {
    // The generate command was started with the --watch parameter. Run it in watch mode.

    await runInWatchMode(config);
  } else {
    // Run the generator once.

    try {
      await handleGenerate(config, {
        writeFile: fs.writeFile,
        log: console.log,
        checkHasExpressOpenApiValidator: hasExpressOpenApiValidator,
      });
      console.log("✅ Generated successfully");
    } catch (e: any) {
      console.log(`❌ Failed to generate: ${e.message}`);
    }
  }
};

async function runInWatchMode(config: ConfigOptions) {
  let timeout: any;
  let currentRun: Promise<void> | undefined;

  console.log(`Watching for changes in "${config.input}"`);
  const onChange = () => {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
    console.log(`Generating "${config.output}"`);

    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      await currentRun;

      currentRun = Promise.resolve().then(async () => {
        try {
          await handleGenerate(config, {
            writeFile: fs.writeFile,
            log: console.log,
            checkHasExpressOpenApiValidator: hasExpressOpenApiValidator,
          });
          console.log("✅ Generated successfully");
        } catch (e: any) {
          console.log(`❌ Failed to regenerate: ${e.message}`);
        }
      });
    }, 500);
  };

  onChange();
  fsWatch(config.input, onChange);
}
