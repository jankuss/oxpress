import { expectOutputForPart } from "../util/expectOutput";
import { RouterTypePart } from "../../src/generator/parts/RouterTypePart";
import { Route } from "../../src/generator/types";

test("generates router type", async () => {
  await expectOutputForPart(new RouterTypePart(), {
    context: {
      getAllRoutes: (): Route[] => {
        return [
          {
            method: "get",
            path: "/v1/events/{id}",
            operation: {},
          },
        ];
      },
    },
  }).resolves.toEqual(`// @ts-ignore
export interface TypedExpressRouter implements IRouter {
  get(path: "/v1/events/:id", handler: GetV1EventsIdRequestHandler): void;
}`);
});

test("generates router type with summary", async () => {
  await expectOutputForPart(new RouterTypePart(), {
    context: {
      getAllRoutes: (): Route[] => {
        return [
          {
            method: "get",
            path: "/v1/events/{id}",
            operation: {
              summary: "This is a summary",
            },
          },
        ];
      },
    },
  }).resolves.toEqual(`// @ts-ignore
export interface TypedExpressRouter implements IRouter {
  /** This is a summary */
  get(path: "/v1/events/:id", handler: GetV1EventsIdRequestHandler): void;
}`);
});

test("generates router type with description", async () => {
  await expectOutputForPart(new RouterTypePart(), {
    context: {
      getAllRoutes: (): Route[] => {
        return [
          {
            method: "get",
            path: "/v1/events/{id}",
            operation: {
              description: "This is a description",
            },
          },
        ];
      },
    },
  }).resolves.toEqual(`// @ts-ignore
export interface TypedExpressRouter implements IRouter {
  /** This is a description */
  get(path: "/v1/events/:id", handler: GetV1EventsIdRequestHandler): void;
}`);
});
