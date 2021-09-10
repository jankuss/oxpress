import { GeneratorOutput } from "./types";

export class GeneratorOutputImpl implements GeneratorOutput {
  private _headers: string[] = [];
  private _content: string[] = [];

  addContent(value: string): void {
    this._content.push(value);
  }

  addHeader(value: string): void {
    this._headers.push(value);
  }

  toString() {
    let str = "";
    str += this._headers.join("\n");
    str += "\n";
    str += this._content.join("\n\n");

    return str;
  }
}
