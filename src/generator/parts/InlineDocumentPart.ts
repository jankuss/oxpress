import { GeneratorPart, GeneratorPartOptions } from "../types";
import { INLINE_DOCUMENT_IDENTIFIER } from "../constants";

export class InlineDocumentPart implements GeneratorPart {
  async visit({ context, output }: GeneratorPartOptions): Promise<void> {
    output.addContent(
      `const ${INLINE_DOCUMENT_IDENTIFIER}: any = ${JSON.stringify(
        context.document
      )}`
    );
  }
}
