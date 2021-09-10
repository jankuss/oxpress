import {
  INLINE_DOCUMENT_IDENTIFIER,
  VALIDATION_MIDDLEWARE_IDENTIFIER,
} from "../constants";
import {
  GeneratorConfig,
  GeneratorContext,
  GeneratorOutput,
  GeneratorPart,
  GeneratorPartOptions,
} from "../types";

export class ValidationMiddlewarePart implements GeneratorPart {
  async visit({
    output,
    config,
    context,
  }: GeneratorPartOptions): Promise<void> {
    if (!config.validationMiddleware) return;

    output.addHeader(MiddlewareImport());
    output.addContent(MiddlewareInstantiation());
  }
}

export const MiddlewareInstantiation = () => {
  return `export const ${VALIDATION_MIDDLEWARE_IDENTIFIER} = OpenApiValidator.middleware({
    apiSpec: ${INLINE_DOCUMENT_IDENTIFIER},
    validateResponses: true,
    validateRequests: true
});`;
};

export const MiddlewareImport = () => {
  return `import * as OpenApiValidator from 'express-openapi-validator';`;
};
