import { GeneratorUtility } from "../src/generator/GeneratorUtility";
import { Response } from "../src/generator/types";

test("returns", () => {
  expect(
    GeneratorUtility.getResponsesForRoute({
      method: "get",
      path: "/v1/events",
      operation: {
        responses: {
          "200": {
            content: {
              ["application/json"]: {
                schema: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          "404": {
            content: {
              ["application/json"]: {
                schema: {
                  type: "array",
                  items: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
    })
  ).toEqual<Response[]>([
    {
      route: expect.anything(),
      content: {
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      status: 200,
      type: "application/json",
    },
    {
      route: expect.anything(),
      content: {
        schema: {
          type: "array",
          items: {
            type: "number",
          },
        },
      },
      status: 404,
      type: "application/json",
    },
  ]);
});
