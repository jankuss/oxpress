---
sidebar_position: 2
---

# Configuration

The `oxpress.config.js` can be modified in the following ways to fit your needs:

```js
module.exports = {
    output: "./oxpress.generated.ts", // The output file for the generated types
    input: "./openapi.yaml", // The input OpenAPI document,
    generator: {
        validation: true, // Whether to enable the integrated validation behavior through `express-openapi-validator`
        autoInvokeValidationMiddleware: true // Whether to automatically invoke the validation middleware in the `wrap` function
    }
};
```