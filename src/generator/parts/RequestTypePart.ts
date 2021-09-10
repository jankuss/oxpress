import {
  BODY_IDENTIFIER,
  PARAM_IDENTIFIER,
  QUERY_IDENTIFIER,
  REQUEST_IDENTIFIER,
} from "../constants";
import { GeneratorPart, GeneratorPartOptions, Route } from "../types";

export class RequestTypePart implements GeneratorPart {
  constructor(private _route: Route) {}

  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    const identifierRequest = context.getRequestHandlerTypeIdentifierName(
      this._route,
      REQUEST_IDENTIFIER
    );
    const identifierPathParams = context.getRequestHandlerTypeIdentifierName(
      this._route,
      PARAM_IDENTIFIER
    );
    const identifierQuery = context.getRequestHandlerTypeIdentifierName(
      this._route,
      QUERY_IDENTIFIER
    );

    const identifierBody = context.getRequestHandlerTypeIdentifierName(
      this._route,
      BODY_IDENTIFIER
    );

    output.addContent(
      `export type ${identifierRequest} = Request<${identifierPathParams}, any, ${identifierBody}, ${identifierQuery}, any>`
    );
  }
}
