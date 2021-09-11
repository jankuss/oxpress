import {
  BODY_IDENTIFIER,
  PARAM_IDENTIFIER,
  QUERY_IDENTIFIER,
  REQUEST_IDENTIFIER,
} from "../constants";
import { GeneratorPart, GeneratorPartOptions, Route } from "../types";
import { GeneratorUtility } from "../GeneratorUtility";

export class RequestTypePart implements GeneratorPart {
  constructor(private _route: Route) {}

  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    const identifierRequest = GeneratorUtility.getRouteSpecificIdentifier(
      this._route,
      REQUEST_IDENTIFIER
    );
    const identifierPathParams = GeneratorUtility.getRouteSpecificIdentifier(
      this._route,
      PARAM_IDENTIFIER
    );
    const identifierQuery = GeneratorUtility.getRouteSpecificIdentifier(
      this._route,
      QUERY_IDENTIFIER
    );

    const identifierBody = GeneratorUtility.getRouteSpecificIdentifier(
      this._route,
      BODY_IDENTIFIER
    );

    output.addContent(
      `export type ${identifierRequest} = Request<${identifierPathParams}, any, ${identifierBody}, ${identifierQuery}, any>`
    );
  }
}
