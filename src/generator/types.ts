import { OpenAPI3, OperationObject, SchemaObject } from "openapi-typescript";

export interface GeneratorConfig {
  validation: boolean;
  autoInvokeValidationMiddleware: boolean;
  validatorOptions?: any;
}

export interface Route {
  method: string;
  path: string;
  operation?: OperationObject;
}

export interface ComponentSchema {
  name: string;
  schema: SchemaObject;
}

export interface Response {
  status: number;
  type: string;
  content?: unknown;
  route: Route;
}

export interface GeneratorContext {
  document: OpenAPI3;

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
