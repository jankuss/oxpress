import openapiTS, {
  OpenAPI2,
  OpenAPI3,
  OperationObject,
  ParameterObject,
} from "openapi-typescript";
import { join, upperFirst } from "lodash";
import {
  GeneratorConfig,
  GeneratorContext,
  GeneratorPart,
  Response,
  Route,
} from "./types";
import { ExpressImportsPart } from "./parts/ExpressImportsPart";
import { ValidationMiddlewarePart } from "./parts/ValidationMiddlewarePart";
import { OpenApiTypescriptTypesPart } from "./parts/OpenApiTypescriptTypesPart";
import { InlineDocumentPart } from "./parts/InlineDocumentPart";
import { RouterTypePart } from "./parts/RouterTypePart";
import { WrapFunctionPart } from "./parts/WrapFunctionPart";
import { RequestQueryTypePart } from "./parts/RequestQueryTypePart";
import { RequestParamsTypePart } from "./parts/RequestParamsTypePart";
import { RequestHandlerTypePart } from "./parts/RequestHandlerTypePart";
import { ResponseTypePart } from "./parts/ResponseTypePart";
import { ResponseBodyTypePart } from "./parts/ResponseBodyTypePart";
import { GeneratorOutputImpl } from "./GeneratorOutputImpl";
import { RequestTypePart } from "./parts/RequestTypePart";
import { RequestBodyTypePart } from "./parts/RequestBodyTypePart";
import { GeneratorUtility } from "./GeneratorUtility";

const validMethods = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
]);

export class Generator implements GeneratorContext {
  private _parts: GeneratorPart[] = [];

  constructor(
    public readonly config: GeneratorConfig,
    public readonly document: OpenAPI2 | OpenAPI3
  ) {
    this._parts.push(new ExpressImportsPart());
    this._parts.push(new OpenApiTypescriptTypesPart());
    this._parts.push(new InlineDocumentPart());
    this._parts.push(new RouterTypePart());

    this._parts.push(new ValidationMiddlewarePart());
    this._parts.push(new WrapFunctionPart());

    for (const route of this.getAllRoutes()) {
      this._parts.push(new RequestTypePart(route));
      this._parts.push(new RequestQueryTypePart(route));
      this._parts.push(new RequestBodyTypePart(route));
      this._parts.push(new RequestParamsTypePart(route));
      for (const response of GeneratorUtility.getResponsesForRoute(route)) {
        this._parts.push(new ResponseBodyTypePart(route, response));
      }
      this._parts.push(new ResponseTypePart(route));
      this._parts.push(new ResponseTypePart(route));
      this._parts.push(new RequestHandlerTypePart(route));
    }
  }

  async parse() {
    const output = new GeneratorOutputImpl();

    for (const part of this._parts) {
      await part.visit({ output, context: this, config: this.config });
    }

    return output.toString();
  }

  public getAllRoutes(): Route[] {
    const routes: Route[] = [];

    for (const path in this.document.paths) {
      for (const method in this.document.paths[path]) {
        if (!validMethods.has(method)) continue;
        const operation: any = this.document.paths[path];

        // @ts-ignore
        routes.push({
          method: method,
          path: path,
          operation: operation[method],
        });
      }
    }

    return routes;
  }
}
