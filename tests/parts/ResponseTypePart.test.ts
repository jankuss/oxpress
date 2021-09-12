import { expectOutputForPart } from "../util/expectOutput";
import { ResponseTypePart } from "../../src/generator/parts/ResponseTypePart";

test("generates response type", async () => {
  await expectOutputForPart(
    new ResponseTypePart({
      method: "get",
      path: "/v1/events/{id}",
      operation: {
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {},
              },
            },
          },
        },
      },
    })
  ).resolves.toEqual(`export interface GetV1EventsIdResponse extends Response {
  status(code: 200): Omit<this, "json"> & { json: (body: GetV1EventsIdResponseBody200ApplicationJson) => GetV1EventsIdResponse };
  status(code: number): this;
}`);
});
