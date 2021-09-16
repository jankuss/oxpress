import { OpenAPI3 } from "openapi-typescript";
import {
  GeneratorConfig,
  GeneratorContext,
  GeneratorPart,
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

const getDefaultParts = (context: GeneratorContext) => {
  const parts: GeneratorPart[] = [];

  parts.push(new ExpressImportsPart());
  parts.push(new OpenApiTypescriptTypesPart());
  parts.push(new InlineDocumentPart());
  parts.push(new RouterTypePart());
  parts.push(new ValidationMiddlewarePart());
  parts.push(new WrapFunctionPart());

  for (const route of context.getAllRoutes()) {
    parts.push(new RequestTypePart(route));
    parts.push(new RequestQueryTypePart(route));
    parts.push(new RequestBodyTypePart(route));
    parts.push(new RequestParamsTypePart(route));
    for (const response of GeneratorUtility.getResponsesForRoute(route)) {
      parts.push(new ResponseBodyTypePart(route, response));
    }
    parts.push(new ResponseTypePart(route));
    parts.push(new ResponseTypePart(route));
    parts.push(new RequestHandlerTypePart(route));
  }

  return parts;
};

export type OpenAPIDocument = OpenAPI3 & { info: any };

export class Generator implements GeneratorContext {
  private _parts: GeneratorPart[] = [];

  constructor(
    public readonly config: GeneratorConfig,
    public readonly document: OpenAPIDocument,
    private getParts = getDefaultParts
  ) {
    this._parts = getParts(this);
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
