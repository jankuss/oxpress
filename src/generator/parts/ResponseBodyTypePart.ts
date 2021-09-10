import { GeneratorPart, GeneratorPartOptions, Response, Route } from "../types";

export class ResponseBodyTypePart implements GeneratorPart {
  constructor(private _route: Route, private _response: Response) {}

  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    const { path, method } = this._route;

    let type = `paths["${path}"]["${method}"]["responses"][${this._response.status}]["content"]["${this._response.type}"]`;
    output.addContent(
      `export type ${this._response.bodyIdentifier} = ${type};`
    );
  }
}
