import { Generator } from "../../src";
import { GeneratorConfig } from "../../src/generator/types";
import { ValidationMiddlewarePart } from "../../src/generator/parts/ValidationMiddlewarePart";
import { WrapFunctionPart } from "../../src/generator/parts/WrapFunctionPart";

test("validation middleware", async () => {
  const generator = new Generator(
    {
      validationMiddleware: true,
      invokeValidationMiddleware: true,
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
      validationMiddleware: true,
      invokeValidationMiddleware: false,
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
