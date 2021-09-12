import { GeneratorOutputImpl } from "../../src/generator/GeneratorOutputImpl";
import { defaultGeneratorOptions } from "../../src/config";
import { GeneratorContext } from "../../src/generator/types";
import { RequestParamsTypePart } from "../../src/generator/parts/RequestParamsTypePart";
import { expectOutputForPart } from "../util/expectOutput";

test("generates params type", async () => {
  await expectOutputForPart(
    new RequestParamsTypePart({
      method: "get",
      path: "/v1/events/{id}",
      operation: {
        parameters: [{ in: "path", name: "id", type: "string" }],
      },
    })
  ).resolves.toEqual(
    `export type GetV1EventsIdParams = paths["/v1/events/{id}"]["get"]["parameters"]["path"];`
  );
});

test("generates empty params type", async () => {
  await expectOutputForPart(
    new RequestParamsTypePart({
      method: "get",
      path: "/v1/events",
      operation: {
        parameters: [{ in: "query", name: "id", type: "string" }],
      },
    })
  ).resolves.toEqual(`export type GetV1EventsParams = {};`);
});
