import { GeneratorPart, GeneratorPartOptions } from "../types";

export class ExpressImportsPart implements GeneratorPart {
  async visit({ output }: GeneratorPartOptions): Promise<void> {
    output.addHeader(ExpressImports());
  }
}

const ExpressImports = () =>
  `import { Request, Response, NextFunction, IRouter } from "express"`;
