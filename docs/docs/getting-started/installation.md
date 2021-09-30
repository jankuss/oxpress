---
sidebar_position: 2
---

# Installation

To install oxpress the easy way, run the following command in your project:

```
npx oxpress init
```

This will install all required dependencies into your project and will initialize oxpress with a basic `oxpress.config.js`.

<details>
<summary>Manual Installation</summary>

### Install Dependencies

To install oxpress, run the following command:

If you are using `yarn`:

```
yarn add express express-openapi-validator
yarn add @types/express typescript oxpress -D
```

If you are using `npm`:

```
npm install express express-openapi-validator
npm install @types/express typescript oxpress -D
```

### Initializing the project

After installing the dependencies, run the following command:

```
./node_modules/.bin/oxpress init --skip-deps
```

This will create a default `oxpress.config.js` in the project root.
</details>

