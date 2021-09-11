import { GeneratorUtility } from "../src/generator/GeneratorUtility";

test("returns an identifier with parameters", () => {
  expect(
    GeneratorUtility.getUniqueRouteIdentifier({
      path: "/v1/events/{id}",
      method: "get",
      operation: {},
    })
  ).toEqual("GetV1EventsId");
});

test("returns an identifier", () => {
  expect(
    GeneratorUtility.getUniqueRouteIdentifier({
      path: "/v1/events",
      method: "post",
      operation: {},
    })
  ).toEqual("PostV1Events");
});

test("throws when route contains invalid characters", () => {
  expect(() =>
    GeneratorUtility.getUniqueRouteIdentifier({
      path: "/v1/events/{abc.$id}",
      method: "get",
      operation: {},
    })
  ).toThrow(`The route "/v1/events/{abc.$id}" contains invalid characters.`);
});
