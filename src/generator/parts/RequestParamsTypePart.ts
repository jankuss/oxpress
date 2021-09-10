import { PARAM_IDENTIFIER } from "../constants";
import { GeneratorPart, GeneratorPartOptions, Route } from "../types";

export class RequestParamsTypePart implements GeneratorPart {
  constructor(private _route: Route) {}

  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    const { path, method } = this._route;
    const identifierPathParams = context.getRequestHandlerTypeIdentifierName(
      this._route,
      PARAM_IDENTIFIER
    );
    const pathParams = context.getRouteParametersOfKind(this._route, "path");

    let pathParamsDefinition = `{}`;
    if (pathParams.length > 0) {
      pathParamsDefinition = `paths["${path}"]["${method}"]["parameters"]["path"]`;
    }

    output.addContent(
      `export type ${identifierPathParams} = ${pathParamsDefinition};`
    );
  }
}
