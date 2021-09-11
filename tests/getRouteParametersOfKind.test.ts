import { GeneratorUtility } from "../src/generator/GeneratorUtility";

test("gets query parameters", () => {
  expect(
    GeneratorUtility.getRouteParametersOfKind(
      {
        method: "get",
        path: "/v1/events/:test2",
        operation: {
          parameters: [
            { type: "number", in: "query", name: "test1" },
            { type: "number", in: "path", name: "test2" },
          ],
        },
      },
      "query"
    )
  ).toEqual([{ type: "number", in: "query", name: "test1" }]);
});

test("gets route parameters", () => {
  expect(
    GeneratorUtility.getRouteParametersOfKind(
      {
        method: "get",
        path: "/v1/events/:test2",
        operation: {
          parameters: [
            { type: "number", in: "query", name: "test1" },
            { type: "number", in: "path", name: "test2" },
          ],
        },
      },
      "path"
    )
  ).toEqual([{ type: "number", in: "path", name: "test2" }]);
});
