import { getOxpress } from "./util/getOxpress";
import express, { Request, Response } from "express";
import request from "supertest";
import { OpenAPIDocument } from "../src/generator/Generator";

test("succeeds when type of parameter is valid", async () => {
  const { wrap } = await getOxpress(paramTestDocument);
  const app = express();
  wrap(app);

  const handler = jest.fn((req: Request, res: Response) => {
    expect(req.params).toEqual({ id: 123 });
    res.json("Text");
  });
  app.get("/v1/users/:id", handler);

  await request(app).get("/v1/users/123").expect(200);
  expect(handler).toHaveBeenCalled();
});

test("errors when type of parameter is invalid", async () => {
  const { wrap } = await getOxpress(paramTestDocument);
  const app = express();
  wrap(app);

  const handler = jest.fn((req: Request, res: Response) => {
    res.json("Text");
  });
  app.get("/v1/users/:id", handler);

  await request(app).get("/v1/users/abc").expect(400);
  expect(handler).not.toHaveBeenCalled();
});

const paramTestDocument: OpenAPIDocument = {
  openapi: "3.0.0",
  info: {
    title: "Test Title",
    version: "1.0.0",
  },
  paths: {
    "/v1/users/{id}": {
      get: {
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "integer",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
