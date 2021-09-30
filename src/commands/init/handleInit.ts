import { CommandInitOptions } from "./types";
import path from "path";
import { defaultConfig } from "../../config";

export interface InitDependencies {
  findNearestPackageJson: (path: string) => Promise<string | undefined>;
  checkConfigFileExists: (path: string) => Promise<boolean>;
  installDependencies: (projectRootDirectory: string) => Promise<void>;
  writeConfigFile: (path: string, content: string) => Promise<void>;
  log: (str: string) => void;
}

export async function handleInit(
  { skipDeps = false }: CommandInitOptions,
  deps: InitDependencies
) {
  const {
    findNearestPackageJson,
    checkConfigFileExists,
    installDependencies,
    log,
  } = deps;

  // Try finding the nearest package.json to identify the root of a project.
  const nearestPackageJson = await findNearestPackageJson("package.json");
  if (nearestPackageJson == null) {
    log(
      `Couldn't find the project root. Make sure you have a "package.json" in your directory structure.`
    );

    return 1;
  }

  const projectRootDirectory = path.dirname(nearestPackageJson);
  const configFileLocation = path.join(
    projectRootDirectory,
    "oxpress.config.js"
  );

  if (await checkConfigFileExists(configFileLocation)) {
    // The config file already exists, so we will not rerun the initialization process.

    log(
      `A oxpress configuration file already exists at "${configFileLocation}"`
    );

    return 1;
  }

  if (!skipDeps) {
    // Install the required peerDependencies of the package
    await installDependencies(projectRootDirectory);
  }

  const { generator, ...config } = defaultConfig;

  await deps.writeConfigFile(
    configFileLocation,
    `module.exports = ${JSON.stringify(config, null, 2)};`
  );

  log(
    `Successfully initialized the oxpress project in: "${projectRootDirectory}"`
  );

  return 0;
}
