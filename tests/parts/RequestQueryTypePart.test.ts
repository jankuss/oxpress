import { RequestQueryTypePart } from "../../src/generator/parts/RequestQueryTypePart";
import { GeneratorOutputImpl } from "../../src/generator/GeneratorOutputImpl";
import { defaultGeneratorOptions } from "../../src/config";
import { GeneratorContext } from "../../src/generator/types";

test("generates empty query type", async () => {
  const output = new GeneratorOutputImpl();
  const part = new RequestQueryTypePart({
    method: "get",
    path: "/v1/events/{id}",
    operation: {
      parameters: [{ in: "path", name: "id", type: "string" }],
    },
  });

  await part.visit({
    context: {} as GeneratorContext,
    config: defaultGeneratorOptions,
    output,
  });

  expect(output.toString()).toEqual(`export type GetV1EventsIdQuery = {};`);
});

test("generates query type with parameter", async () => {
  const output = new GeneratorOutputImpl();
  const part = new RequestQueryTypePart({
    method: "get",
    path: "/v1/events",
    operation: {
      parameters: [{ in: "query", name: "id", type: "string" }],
    },
  });

  await part.visit({
    context: {} as GeneratorContext,
    config: defaultGeneratorOptions,
    output,
  });

  expect(output.toString()).toEqual(
    `export type GetV1EventsQuery = paths["/v1/events"]["get"]["parameters"]["query"];`
  );
});
