import { getConfig } from "../src/config";

test("returns default configuration when config file not found", () => {
  expect(
    getConfig(
      {},
      {
        requireConfigFile: () => {
          throw new Error("Not found");
        },
        hasExpressOpenApiValidator: () => true,
      }
    )
  ).toEqual({
    input: "./swagger.yaml",
    output: "./oxpress.generated.ts",
    generator: {
      autoInvokeValidationMiddleware: true,
      validation: true,
    },
  });
});

test("disables validation when express-openapi-validator not available", () => {
  expect(
    getConfig(
      {},
      {
        requireConfigFile: () => {
          return {};
        },
        hasExpressOpenApiValidator: () => false,
      }
    )
  ).toEqual({
    input: "./swagger.yaml",
    output: "./oxpress.generated.ts",
    generator: {
      autoInvokeValidationMiddleware: false,
      validation: false,
    },
  });
});

test("uses parameters from config file", () => {
  expect(
    getConfig(
      {},
      {
        requireConfigFile: () => {
          return {
            input: "./a.yaml",
            output: "./b.ts",
            generator: {
              autoInvokeValidationMiddleware: false,
            },
          };
        },
        hasExpressOpenApiValidator: () => true,
      }
    )
  ).toEqual({
    input: "./a.yaml",
    output: "./b.ts",
    generator: {
      autoInvokeValidationMiddleware: false,
      validation: true,
    },
  });
});

test("uses parameters from command params", () => {
  expect(
    getConfig(
      {
        input: "./c.yaml",
      },
      {
        requireConfigFile: () => {
          return {
            input: "./a.yaml",
            output: "./b.ts",
            generator: {
              autoInvokeValidationMiddleware: false,
            },
          };
        },
        hasExpressOpenApiValidator: () => true,
      }
    )
  ).toEqual({
    input: "./c.yaml",
    output: "./b.ts",
    generator: {
      autoInvokeValidationMiddleware: false,
      validation: true,
    },
  });
});
