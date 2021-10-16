import { handleInit, InitDependencies } from "./handleInit";

test("notifies the user when the package.json wasn't found", async () => {
  let output: string[] = [];

  const deps: InitDependencies = {
    findNearestPackageJson: async (path) => undefined,
    writeConfigFile: jest.fn(async (path, content) => {}),
    log: (str) => output.push(str),
    checkConfigFileExists: async (path) => true,
    installDependencies: jest.fn(async () => {}),
  };

  await handleInit({}, deps);

  expect(output).toEqual([
    `Couldn't find the project root. Make sure you have a "package.json" in your directory structure.`,
  ]);
  expect(deps.installDependencies).not.toHaveBeenCalled();
  expect(deps.writeConfigFile).not.toHaveBeenCalled();
});

test("notifies the user when the config file already exists", async () => {
  let output: string[] = [];

  const deps: InitDependencies = {
    findNearestPackageJson: async (path) => "/Projects/Project/package.json",
    writeConfigFile: jest.fn(async (path, content) => {}),
    log: (str) => output.push(str),
    checkConfigFileExists: async (path) => true,
    installDependencies: jest.fn(async () => {}),
  };

  expect(await handleInit({}, deps)).toEqual(1);

  expect(output).toEqual([
    `A oxpress configuration file already exists at "/Projects/Project/oxpress.config.js"`,
  ]);
  expect(deps.installDependencies).not.toHaveBeenCalled();
  expect(deps.writeConfigFile).not.toHaveBeenCalled();
});

test("creates config file", async () => {
  let output: string[] = [];

  const deps: InitDependencies = {
    findNearestPackageJson: async (path) => "/Projects/Project/package.json",
    writeConfigFile: jest.fn(async (path, content) => {}),
    log: (str) => output.push(str),
    checkConfigFileExists: async (path) => false,
    installDependencies: jest.fn(async () => {}),
  };

  expect(await handleInit({}, deps)).toEqual(0);

  expect(output).toEqual([
    `Successfully initialized the oxpress project in: "/Projects/Project"`,
  ]);

  expect(deps.installDependencies).toHaveBeenCalled();
  expect(deps.writeConfigFile).toHaveBeenCalledWith(
    "/Projects/Project/oxpress.config.js",
    `module.exports = {
  "output": "./oxpress.generated.ts",
  "input": "./openapi.yaml"
};`
  );
});

test("creates config file, but doesnt install dependencies when skipDeps is true", async () => {
  let output: string[] = [];

  const deps: InitDependencies = {
    findNearestPackageJson: async (path) => "/Projects/Project/package.json",
    writeConfigFile: jest.fn(async (path, content) => {}),
    log: (str) => output.push(str),
    checkConfigFileExists: async (path) => false,
    installDependencies: jest.fn(async () => {}),
  };

  expect(await handleInit({ skipDeps: true }, deps)).toEqual(0);

  expect(output).toEqual([
    `Successfully initialized the oxpress project in: "/Projects/Project"`,
  ]);

  expect(deps.installDependencies).not.toHaveBeenCalled();
  expect(deps.writeConfigFile).toHaveBeenCalledWith(
    "/Projects/Project/oxpress.config.js",
    `module.exports = {
  "output": "./oxpress.generated.ts",
  "input": "./openapi.yaml"
};`
  );
});
