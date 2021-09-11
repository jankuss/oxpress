import { GeneratorOutputImpl } from "../../src/generator/GeneratorOutputImpl";
import { defaultGeneratorOptions } from "../../src/config";
import { GeneratorContext } from "../../src/generator/types";
import { RequestParamsTypePart } from "../../src/generator/parts/RequestParamsTypePart";

test("generates empty params type", async () => {
  const output = new GeneratorOutputImpl();
  const part = new RequestParamsTypePart({
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

  expect(output.toString()).toEqual(
    `export type GetV1EventsIdParams = paths["/v1/events/{id}"]["get"]["parameters"]["path"];`
  );
});

test("generates params type", async () => {
  const output = new GeneratorOutputImpl();
  const part = new RequestParamsTypePart({
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

  expect(output.toString()).toEqual(`export type GetV1EventsParams = {};`);
});
