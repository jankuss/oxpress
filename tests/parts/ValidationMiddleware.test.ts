import { Generator } from "../../src";
import { GeneratorConfig } from "../../src/generator/types";
import { ValidationMiddlewarePart } from "../../src/generator/parts/ValidationMiddlewarePart";
import { WrapFunctionPart } from "../../src/generator/parts/WrapFunctionPart";

test("validation middleware", async () => {
  const generator = new Generator(
    {
      validation: true,
      autoInvokeValidationMiddleware: true,
    } as GeneratorConfig,
    {
      openapi: "3.0.0",
      paths: {
        "/v1/events": {},
      },
    },
    () => [new ValidationMiddlewarePart(), new WrapFunctionPart()]
  );

  await expect(generator.parse()).resolves.toEqual(
    `import * as OpenApiValidator from 'express-openapi-validator';

export const validationMiddleware = OpenApiValidator.middleware({
  apiSpec: inlineDocument,
  validateResponses: true,
  validateRequests: true
});

export function wrap<T extends IRouter>(router: T): TypedExpressRouter {
  router.use(validationMiddleware);
  return router as TypedExpressRouter;
}`
  );
});

test("wrap doesn't invoke validation middleware, when invokeValidationMiddleware is false", async () => {
  const generator = new Generator(
    {
      validation: true,
      autoInvokeValidationMiddleware: false,
    } as GeneratorConfig,
    {
      openapi: "3.0.0",
      paths: {
        "/v1/events": {},
      },
    },
    () => [new ValidationMiddlewarePart(), new WrapFunctionPart()]
  );

  await expect(generator.parse()).resolves.toEqual(
    `import * as OpenApiValidator from 'express-openapi-validator';

export const validationMiddleware = OpenApiValidator.middleware({
  apiSpec: inlineDocument,
  validateResponses: true,
  validateRequests: true
});

export function wrap<T extends IRouter>(router: T): TypedExpressRouter {
  return router as TypedExpressRouter;
}`
  );
});

test("validation middleware is not generated, when validationMiddleware is false", async () => {
  const generator = new Generator(
    {
      validation: false,
      autoInvokeValidationMiddleware: true,
    } as GeneratorConfig,
    {
      openapi: "3.0.0",
      paths: {
        "/v1/events": {},
      },
    },
    () => [new ValidationMiddlewarePart(), new WrapFunctionPart()]
  );

  await expect(generator.parse()).resolves
    .toEqual(`export function wrap<T extends IRouter>(router: T): TypedExpressRouter {
  return router as TypedExpressRouter;
}`);
});
