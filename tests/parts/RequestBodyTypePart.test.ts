import { RequestBodyTypePart } from "../../src/generator/parts/RequestBodyTypePart";
import { expectOutputForPart } from "../util/expectOutput";

test("generates empty request body type", async () => {
  await expectOutputForPart(
    new RequestBodyTypePart({
      method: "get",
      path: "/v1/events/{id}",
      operation: {
        requestBody: {},
      },
    })
  ).resolves.toEqual(`export type GetV1EventsIdBody = {};`);
});

test("generates request body type", async () => {
  await expectOutputForPart(
    new RequestBodyTypePart({
      method: "get",
      path: "/v1/events/{id}",
      operation: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    })
  ).resolves.toEqual(
    `export type GetV1EventsIdBody = paths["/v1/events/{id}"]["get"]["requestBody"]["content"]["application/json"];`
  );
});
