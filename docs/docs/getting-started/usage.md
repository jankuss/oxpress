---
sidebar_position: 2
---

# Usage

## 1. Specifying input and output files

Check the `oxpress.config.js` file, which was initialized in the previous step.
It should look like the following:

```
module.exports = {
  output: "./oxpress.generated.ts",
  input: "./swagger.yaml",
};
```

where:
- `input` points to your OpenAPI Document
- `output` is the path to the generated output file

Modify both of these settings to fit your needs.
Let's say our input file is named differently (`test.swagger.yaml`) and our output should go into a `src` folder.
Then this config should look like this:

```
module.exports = {
  output: "./src/oxpress.generated.ts",
  input: "./test.swagger.yaml",
};
```

To learn more about all the different available options, check out the [Configuration](/docs/configuration) section.

## 2. Running the generator

To generate the oxpress types, run the following command:

```
npx oxpress generate
```

This will write the oxpress types into the specified file. You can now use oxpress with your Express application.

#### Running the generator in watch mode

In case you are actively changing the underlying OpenAPI document, it might be handy to run the generator in watch mode.
You can do this by running:

```
npx oxpress generate --watch
```

Now, the generated oxpress types will always be in sync with your OpenAPI document.

## 3. Wrapping your application

To have the generated types within your express application, `oxpress` provides a `wrap` function.
This `wrap` function will return a typed version of your express `Application` or `Router`.

The following snippet shows the usage of the `wrap` function.

```ts
import * as express from "express";
import { wrap } from "./oxpress.generated";

const app = express();
const router = wrap(app);

router.get("/v1/users/:userId", (req, res) => {
    res.status(200).json({
        age: 21,
        name: "Jan",
        id: "123",
    });
});
```
