import path from "path";
import { promises as fs } from "fs";
import { spawnSync } from "child_process";
import findUp from "find-up";
import { CommandInitOptions } from "./types";
import { handleInit } from "./handleInit";

/**
 * The handler which is invoked for the `init` command.
 */
export async function commandInit(options: CommandInitOptions) {
  const exitCode = await handleInit(options, {
    findNearestPackageJson: findUp,
    installDependencies,
    checkConfigFileExists: exists,
    writeConfigFile: fs.writeFile,
    log: console.log,
  });

  process.exit(exitCode);
}

async function installDependencies(projectRootDirectory: string) {
  const yarnLockLocation = path.join(projectRootDirectory, "yarn.lock");

  // For oxpress to work, we need the following dependencies:
  // Dependencies:
  // * "express" for the web server
  // * "express-openapi-validator" for the validator which is used in the generated output
  //
  // Development Dependencies:
  // * "@types/express" for the express typings
  // * "typescript" for typescript
  // * "oxpress" for generating the types of the express server
  const dependencies = ["express", "express-openapi-validator"];
  const devDependencies = ["@types/express", "typescript", "oxpress"];

  // npm install express express-openapi-validator
  // npm install @types/express typescript oxpress -D

  console.log(`Installing dependencies: ${dependencies.join(", ")}`);
  console.log(`Installing devDependencies: ${devDependencies.join(", ")}`);
  if (await exists(yarnLockLocation)) {
    console.log(
      `Detected a "yarn.lock" in the project. Using yarn for installing dependencies.`
    );

    runInstallCommand(projectRootDirectory, "yarn", ["add", ...dependencies]);
    runInstallCommand(projectRootDirectory, "yarn", [
      "add",
      ...devDependencies,
      "-D",
    ]);
  } else {
    runInstallCommand(projectRootDirectory, "npm", [
      "install",
      ...dependencies,
    ]);
    runInstallCommand(projectRootDirectory, "npm", [
      "install",
      ...devDependencies,
      "-D",
    ]);
  }
}

function runInstallCommand(
  projectRootDirectory: string,
  command: string,
  args: string[]
) {
  spawnSync(command, args, {
    cwd: projectRootDirectory,
    stdio: "inherit",
  });
}

async function exists(path: string) {
  try {
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
}
