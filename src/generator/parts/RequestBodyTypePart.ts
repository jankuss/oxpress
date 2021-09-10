import { GeneratorPart, GeneratorPartOptions, Route } from "../types";

import { BODY_IDENTIFIER } from "../constants";

export class RequestBodyTypePart implements GeneratorPart {
  constructor(private _route: Route) {}

  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    const { path, method } = this._route;
    const identifierBody = context.getRequestHandlerTypeIdentifierName(
      this._route,
      BODY_IDENTIFIER
    );

    let bodyDefinition = `{}`;

    if (
      this._route.operation?.requestBody != null &&
      !("$ref" in this._route.operation.requestBody) &&
      this._route.operation.requestBody.content != null
    ) {
      const keys = Object.keys(this._route.operation.requestBody.content);
      if (keys.length === 1) {
        bodyDefinition = `paths["${path}"]["${method}"]["requestBody"]["content"]["${keys[0]}"]`;
      }
    }

    output.addContent(`export type ${identifierBody} = ${bodyDefinition};`);
  }
}
