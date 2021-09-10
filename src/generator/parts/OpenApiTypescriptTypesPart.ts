import { GeneratorPart, GeneratorPartOptions } from "../types";
import openapiTS from "openapi-typescript";

export class OpenApiTypescriptTypesPart implements GeneratorPart {
  async visit({ output, context }: GeneratorPartOptions): Promise<void> {
    const openapiTypescriptTypes = await openapiTS(context.document as any, {});
    output.addContent(`// BEGIN "openapi-typescript" SECTION
${openapiTypescriptTypes}
// END "openapi-typescript" SECTION`);
  }
}
