![Logo of oxpress](logo.png)

[![npm](https://img.shields.io/npm/v/oxpress)](https://www.npmjs.com/package/oxpress) [![Codecov](https://img.shields.io/codecov/c/github/jankuss/oxpress)](https://codecov.io/gh/jankuss/oxpress)

# What is oxpress?

Do you like **TypeScript, Express and OpenAPI** and use those tools for **API development**?

Then oxpress is made for you. Oxpress is a code generation tool,
which generates a **type-safe Express server** based on your OpenAPI Document.

### How?

Oxpress combines packages out of the Node.JS OpenAPI world. These are:
- `openapi-typescript`, for generating the types in your OpenAPI document
- `express-openapi-validator`, for validating requests and responses from your express server

## Goals

### Easy to use

And that is not just a catchphrase. Run the following command in your project and you are ready to go:

```
npx oxpress init
```

Then run the following command to generate the types for your express server:

```
npx oxpress generate
```

### Integrates seamlessly into your current project

If you are already using express and want a more typed experience, you can use `oxpress` to incrementally adapt to a type safe express server. The API is exactly the same as express, so it is easy to adapt `oxpress`, or if you don't like it, to remove it.

### Design First Approach

Unlike other tools like [tsoa](https://github.com/lukeautry/tsoa),
oxpress fully embraces the [design first](https://swagger.io/blog/api-design/design-first-or-code-first-api-development/)
kind of API development.

To sum this up: The design first approach puts the OpenAPI Document first, and your server just becomes an implementation of your specification.

### Type Safety

OpenAPI makes you able to describe your API in great detail. Why not have this amount of detail within your Express-Application?
The following parts of Express are fully typed by oxpress:

* Routes
* Route Parameters
* Query Parameters
* Request Body (JSON)
* Response Body (JSON), in conjunction with the Status Code

![Type Safety in Action](docs/static/img/typed_express_app.png)

### Integrated Validation

Oxpress uses `express-openapi-validator` by default to validate parameters. This ensures,
that your beautifully typed parameters and responses are also type safe during runtime.

#### Attributions

Ox icon in Logo made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/)
