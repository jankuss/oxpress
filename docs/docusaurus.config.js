const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "oxpress",
    tagline: "Type-Safety for your Express API Server",
    url: "https://your-docusaurus-test-site.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/logo.png",
    organizationName: "facebook", // Usually your GitHub org/user name.
    projectName: "docusaurus", // Usually your repo name.

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl: "https://github.com/jankuss/oxpress/edit/master/docs",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "oxpress",
          logo: {
            alt: "Oxpress Logo",
            src: "img/logo.png",
          },
          items: [
            {
              type: "doc",
              docId: "getting-started/intro",
              position: "left",
              label: "Getting Started",
            },
            {
              href: "https://github.com/jankuss/oxpress",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
