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
  route: Route;
}

export interface GeneratorContext {
  document: OpenAPI2 | OpenAPI3;

  getAllRoutes(): Route[];
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
