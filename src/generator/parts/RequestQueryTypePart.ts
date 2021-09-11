import { QUERY_IDENTIFIER } from "../constants";
import { GeneratorPart, GeneratorPartOptions, Route } from "../types";
import { GeneratorUtility } from "../GeneratorUtility";

export class RequestQueryTypePart implements GeneratorPart {
  constructor(private _route: Route) {}

  async visit({
    context,
    output,
    config,
  }: GeneratorPartOptions): Promise<void> {
    const { path, method } = this._route;
    const queryParams = GeneratorUtility.getRouteParametersOfKind(
      this._route,
      "query"
    );

    let queryParamsDefinition = `{}`;
    const identifierQuery = GeneratorUtility.getRouteSpecificIdentifier(
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
