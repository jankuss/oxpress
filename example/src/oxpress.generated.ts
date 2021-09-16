import { Request, Response, NextFunction, IRouter } from "express";
import * as OpenApiValidator from "express-openapi-validator";

// BEGIN "openapi-typescript" SECTION
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/v1/users/{userId}": {
    /**
     * ## Get user details
     * This endpoint returns the user details
     */
    get: {
      parameters: {
        path: {
          userId: string;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": {
              id: string;
              age: number;
            };
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    User: {
      id: string;
      age: number;
    };
  };
}

export interface operations {}

export interface external {}

// END "openapi-typescript" SECTION

const inlineDocument: any = {
  openapi: "3.0.0",
  info: { title: "Oxpress Test API", version: "1.0.0" },
  paths: {
    "/v1/users/{userId}": {
      get: {
        description:
          "## Get user details\nThis endpoint returns the user details\n",
        parameters: [
          {
            in: "path",
            name: "userId",
            schema: { type: "string" },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    age: { type: "integer" },
                  },
                  required: ["id", "age"],
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: { id: { type: "string" }, age: { type: "integer" } },
        required: ["id", "age"],
      },
    },
  },
};

// @ts-ignore
export interface TypedExpressRouter {
  /** ## Get user details
This endpoint returns the user details
 */
  get(path: "/v1/users/:userId", handler: GetV1UsersUserIdRequestHandler): void;
}

export const validationMiddleware = OpenApiValidator.middleware({
  apiSpec: inlineDocument,
  validateResponses: true,
  validateRequests: true,
});

export function wrap<T extends IRouter>(router: T): TypedExpressRouter {
  router.use(validationMiddleware);
  return router as TypedExpressRouter;
}

export type GetV1UsersUserIdRequest = Request<
  GetV1UsersUserIdParams,
  any,
  GetV1UsersUserIdBody,
  GetV1UsersUserIdQuery,
  any
>;

export type GetV1UsersUserIdQuery = {};

export type GetV1UsersUserIdBody = {};

export type GetV1UsersUserIdParams =
  paths["/v1/users/{userId}"]["get"]["parameters"]["path"];

export type GetV1UsersUserIdResponseBody200ApplicationJson =
  paths["/v1/users/{userId}"]["get"]["responses"][200]["content"]["application/json"];

export interface GetV1UsersUserIdResponse extends Response {
  status(
    code: 200
  ): Omit<this, "json"> & {
    json: (
      body: GetV1UsersUserIdResponseBody200ApplicationJson
    ) => GetV1UsersUserIdResponse;
  };
  status(code: number): this;
}

export interface GetV1UsersUserIdResponse extends Response {
  status(
    code: 200
  ): Omit<this, "json"> & {
    json: (
      body: GetV1UsersUserIdResponseBody200ApplicationJson
    ) => GetV1UsersUserIdResponse;
  };
  status(code: number): this;
}

export interface GetV1UsersUserIdRequestHandler {
  (
    req: GetV1UsersUserIdRequest,
    res: GetV1UsersUserIdResponse,
    next: NextFunction
  ): void;
}
