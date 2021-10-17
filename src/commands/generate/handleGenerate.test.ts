import { handleGenerate } from "./handleGenerate";
import { defaultConfig } from "../../config";

test("generates output", async () => {
  const output: string[] = [];

  const writeFile = jest.fn();

  await handleGenerate(
    {
      input: "./example/example.openapi.yaml",
      output: "./test.generated.ts",
      generator: defaultConfig.generator,
    },
    {
      checkHasExpressOpenApiValidator: () => false,
      log: (value) => output.push(value),
      writeFile: writeFile,
    }
  );

  expect(writeFile).toBeCalledWith("./test.generated.ts", expect.anything());
  expect(output).toEqual([]);
});

test("generates output with deactivated validation", async () => {
  const output: string[] = [];

  const writeFile = jest.fn();

  await handleGenerate(
    {
      input: "./example/example.openapi.yaml",
      output: "./test.generated.ts",
      generator: {
        ...defaultConfig.generator,
        validation: false,
      },
    },
    {
      checkHasExpressOpenApiValidator: () => true,
      log: (value) => output.push(value),
      writeFile: writeFile,
    }
  );

  expect(writeFile).toBeCalledWith("./test.generated.ts", expect.anything());
  expect(output).toEqual([
    `ℹ️ The generation of the validation middleware is deactivated. Make sure you handle the validation of input on your own.`,
  ]);
});

test("generates output with deactivated validation, when validator not installed", async () => {
  const output: string[] = [];

  const writeFile = jest.fn();

  await handleGenerate(
    {
      input: "./example/example.openapi.yaml",
      output: "./test.generated.ts",
      generator: {
        ...defaultConfig.generator,
        validation: false,
      },
    },
    {
      checkHasExpressOpenApiValidator: () => false,
      log: (value) => output.push(value),
      writeFile: writeFile,
    }
  );

  expect(writeFile).toBeCalledWith("./test.generated.ts", expect.anything());
  expect(output).toEqual([
    `ℹ️ The generation of the validation middleware is deactivated. Make sure you handle the validation of input on your own. If this is unintentional, make sure you have the "express-openapi-validator" package installed. In case you want to generate the middleware anyway, set the 'validation' and 'autoInvokeValidationMiddleware' options to true.`,
  ]);
});
