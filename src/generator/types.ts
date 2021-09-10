import {
  OpenAPI2,
  OpenAPI3,
  OperationObject,
  ParameterObject,
} from "openapi-typescript";

export interface GeneratorConfig {
  validationMiddleware: boolean;
  invokeValidationMiddleware: boolean;
  validatorOptions?: any;
}

export interface Route {
  method: string;
  path: string;
  operation?: OperationObject;
}

export interface Response {
  status: number;
  type: string;
  content?: unknown;
  bodyIdentifier: string;
}

export interface GeneratorContext {
  document: OpenAPI2 | OpenAPI3;

  getAllRoutes(): Route[];
  getRequestHandlerTypeIdentifierName(route: Route, identifier: string): string;
  getExpressRoute(value: string): string;
  getResponsesForRoute(route: Route): Response[];
  getRouteParametersOfKind<T extends ParameterObject["in"]>(
    route: Route,
    param: T
  ): ParameterObject[];
}

export interface GeneratorOutput {
  addHeader(value: string): void;
  addContent(value: string): void;
}

export interface GeneratorPartOptions {
  output: GeneratorOutput;
  context: GeneratorContext;
  config: GeneratorConfig;
}

export interface GeneratorPart {
  visit(options: GeneratorPartOptions): Promise<void>;
}
