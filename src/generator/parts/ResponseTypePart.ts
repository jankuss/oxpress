import { RESPONSE_IDENTIFIER } from "../constants";
import {
  GeneratorContext,
  GeneratorPart,
  GeneratorPartOptions,
  Response,
  Route,
} from "../types";

export class ResponseTypePart implements GeneratorPart {
  constructor(private _route: Route) {}

  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    const identifierResponse = context.getRequestHandlerTypeIdentifierName(
      this._route,
      RESPONSE_IDENTIFIER
    );

    const responses = context.getResponsesForRoute(this._route);

    output.addContent(`export interface ${identifierResponse} extends Response {
${responses
  .map((response) => ResponseProperty(context, this._route, response))
  .join("\n")}
status(code: number): this;
}`);
  }
}

const ResponseProperty = (
  context: GeneratorContext,
  route: Route,
  response: Response
) => {
  const identifierResponse = context.getRequestHandlerTypeIdentifierName(
    route,
    RESPONSE_IDENTIFIER
  );

  let responseType = `this`;
  if (response.type === "application/json") {
    responseType = `Omit<this, "json"> & { json: (body: ${response.bodyIdentifier}) => ${identifierResponse} };`;
  }

  return `status(code: ${response.status}): ${responseType}`;
};
