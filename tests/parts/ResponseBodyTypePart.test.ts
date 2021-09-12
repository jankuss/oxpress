import { expectOutputForPart } from "../util/expectOutput";
import { ResponseBodyTypePart } from "../../src/generator/parts/ResponseBodyTypePart";

test("generates response body type part", async () => {
  const route = {
    method: "get",
    path: "/v1/events/{id}",
    operation: {
      requestBody: {},
    },
  };

  await expectOutputForPart(
    new ResponseBodyTypePart(route, {
      type: "application/json",
      status: 200,
      content: {},
      route,
    })
  ).resolves.toEqual(
    `export type GetV1EventsIdResponseBody200ApplicationJson = paths["/v1/events/{id}"]["get"]["responses"][200]["content"]["application/json"];`
  );
});
