import { expectOutputForPart } from "../util/expectOutput";
import { InlineDocumentPart } from "../../src/generator/parts/InlineDocumentPart";

test("inlines the document", async () => {
  await expectOutputForPart(new InlineDocumentPart(), {
    context: {
      document: { openapi: "3.0.0", paths: { "/v1/events/{id}": {} } },
    },
  }).resolves.toEqual(
    `const inlineDocument: any = {"openapi":"3.0.0","paths":{"/v1/events/{id}":{}}}`
  );
});
