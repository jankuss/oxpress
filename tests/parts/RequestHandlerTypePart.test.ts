import { GeneratorOutputImpl } from "../../src/generator/GeneratorOutputImpl";
import { RequestBodyTypePart } from "../../src/generator/parts/RequestBodyTypePart";
import { GeneratorContext } from "../../src/generator/types";
import { defaultGeneratorOptions } from "../../src/config";
import { RequestHandlerTypePart } from "../../src/generator/parts/RequestHandlerTypePart";
import { expectOutputForPart } from "../util/expectOutput";

test("generates request handler type", async () => {
  await expectOutputForPart(
    new RequestHandlerTypePart({
      method: "get",
      path: "/v1/events/{id}",
      operation: {},
    })
  ).resolves.toEqual(`export interface GetV1EventsIdRequestHandler {
  (
    req: GetV1EventsIdRequest,
    res: GetV1EventsIdResponse,
    next: NextFunction,
  ): void;
}`);
});
