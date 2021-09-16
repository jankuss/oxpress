import { GeneratorOutput } from "./types";

export class GeneratorOutputImpl implements GeneratorOutput {
  private _headers: string[] = [];
  private _content: string[] = [];

  public get headers() {
    return this._headers;
  }

  public get content() {
    return this._content;
  }

  addContent(value: string): void {
    this._content.push(value);
  }

  addHeader(value: string): void {
    this._headers.push(value);
  }

  toString() {
    let str = "";
    if (this._headers.length > 0) {
      str += this._headers.join("\n");
      str += "\n\n";
    }
    str += this._content.join("\n\n");

    return str;
  }
}
