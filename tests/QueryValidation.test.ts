import express, { Request, Response } from "express";
import request from "supertest";

import { getOxpress } from "./util/getOxpress";
import { OpenAPIDocument } from "../src/generator/Generator";

test("errors when mandatory query parameter is not set", async () => {
  const { wrap } = await getOxpress(queryTestDocument);
  const app = express();
  wrap(app);

  const handler = jest.fn((req: Request, res: Response) => {
    expect(req.query).toEqual({ id: 123 });
    res.json("Text");
  });
  app.get("/v1/users", handler);

  await request(app).get("/v1/users").expect(400);
  expect(handler).not.toHaveBeenCalled();
});

test("succeeds when mandatory query parameter is set", async () => {
  const { wrap } = await getOxpress(queryTestDocument);
  const app = express();
  wrap(app);

  const handler = jest.fn((req: Request, res: Response) => {
    res.json("Text");
  });
  app.get("/v1/users", handler);

  await request(app).get("/v1/users?id=123").expect(200);
  expect(handler).toHaveBeenCalled();
});

test("errors when query parameter is an invalid type", async () => {
  const { wrap } = await getOxpress(queryTestDocument);
  const app = express();
  wrap(app);

  const handler = jest.fn((req: Request, res: Response) => {
    res.json("Text");
  });
  app.get("/v1/users", handler);

  await request(app).get("/v1/users?id=abc").expect(400);
  expect(handler).not.toHaveBeenCalled();
});

test("succeeds with optional query parameter which is not set", async () => {
  const { wrap } = await getOxpress(queryTestOptionalDocument);
  const app = express();
  wrap(app);

  const handler = jest.fn((req: Request, res: Response) => {
    res.json("Text");
  });
  app.get("/v1/users", handler);

  await request(app).get("/v1/users").expect(200);
  expect(handler).toHaveBeenCalled();
});

test("succeeds with optional query parameter when its set", async () => {
  const { wrap } = await getOxpress(queryTestOptionalDocument);
  const app = express();
  wrap(app);

  const handler = jest.fn((req: Request, res: Response) => {
    expect(req.query).toEqual({ id: 123 });
    res.json("Text");
  });
  app.get("/v1/users", handler);

  await request(app).get("/v1/users?id=123").expect(200);
  expect(handler).toHaveBeenCalled();
});

const queryTestDocument: OpenAPIDocument = {
  openapi: "3.0.0",
  info: {
    title: "Test Title",
    version: "1.0.0",
  },
  paths: {
    "/v1/users": {
      get: {
        parameters: [
          {
            in: "query",
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

const queryTestOptionalDocument: OpenAPIDocument = {
  openapi: "3.0.0",
  info: {
    title: "Test Title",
    version: "1.0.0",
  },
  paths: {
    "/v1/users": {
      get: {
        parameters: [
          {
            in: "query",
            name: "id",
            schema: {
              type: "integer",
            },
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
