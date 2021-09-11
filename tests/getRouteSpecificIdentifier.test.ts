import { GeneratorUtility } from "../src/generator/GeneratorUtility";

test("returns a identifier for a route", () => {
  expect(
    GeneratorUtility.getRouteSpecificIdentifier(
      {
        path: "/v1/events",
        method: "get",
        operation: {},
      },
      "Request"
    )
  ).toEqual("GetV1EventsRequest");
});

test("throws when identifier is empty", () => {
  expect(() =>
    GeneratorUtility.getRouteSpecificIdentifier(
      {
        path: "/v1/events",
        method: "get",
        operation: {},
      },
      ""
    )
  ).toThrow();
});
