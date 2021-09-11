import { GeneratorPart, GeneratorPartOptions, Response, Route } from "../types";
import { GeneratorUtility } from "../GeneratorUtility";

export class ResponseBodyTypePart implements GeneratorPart {
  constructor(private _route: Route, private _response: Response) {}

  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    const { path, method } = this._route;

    const bodyIdentifier = GeneratorUtility.getResponseBodyIdentifier(
      this._route,
      this._response
    );

    let type = `paths["${path}"]["${method}"]["responses"][${this._response.status}]["content"]["${this._response.type}"]`;
    output.addContent(`export type ${bodyIdentifier} = ${type};`);
  }
}
