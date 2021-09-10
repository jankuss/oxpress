import { QUERY_IDENTIFIER } from "../constants";
import { GeneratorPart, GeneratorPartOptions, Route } from "../types";

export class RequestQueryTypePart implements GeneratorPart {
  constructor(private _route: Route) {}

  async visit({
    context,
    output,
    config,
  }: GeneratorPartOptions): Promise<void> {
    const { path, method } = this._route;
    const queryParams = context.getRouteParametersOfKind(this._route, "query");

    let queryParamsDefinition = `{}`;
    const identifierQuery = context.getRequestHandlerTypeIdentifierName(
      this._route,
      QUERY_IDENTIFIER
    );

    if (queryParams.length > 0) {
      queryParamsDefinition = `paths["${path}"]["${method}"]["parameters"]["query"]`;
    }

    output.addContent(
      `export type ${identifierQuery} = ${queryParamsDefinition};`
    );
  }
}
