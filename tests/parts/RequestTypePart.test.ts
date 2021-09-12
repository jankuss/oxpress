import { expectOutputForPart } from "../util/expectOutput";
import { RequestTypePart } from "../../src/generator/parts/RequestTypePart";

test("generates request type", async () => {
  await expectOutputForPart(
    new RequestTypePart({
      method: "get",
      path: "/v1/events/{id}",
      operation: {
        requestBody: {},
      },
    })
  ).resolves.toEqual(
    `export type GetV1EventsIdRequest = Request<GetV1EventsIdParams, any, GetV1EventsIdBody, GetV1EventsIdQuery, any>;`
  );
});
