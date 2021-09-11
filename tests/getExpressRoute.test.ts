import { GeneratorUtility } from "../src/generator/GeneratorUtility";

test("returns a valid express route with params", () => {
  expect(GeneratorUtility.getExpressRoute("/v1/events")).toEqual("/v1/events");
});

test("returns a valid express route with params", () => {
  expect(GeneratorUtility.getExpressRoute("/v1/events/{id}")).toEqual(
    "/v1/events/:id"
  );
});
