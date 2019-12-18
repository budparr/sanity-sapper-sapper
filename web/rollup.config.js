import resolve from "rollup-plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import path from "path";

// So we can import Sanity's JSON config
import json from "@rollup/plugin-json";

// So we can use markdown files in our project, too
import marked from "marked";

// For external PostCSS
import postcss from "rollup-plugin-postcss";

// For Svelte Preprocess PostCSS in templates
const svelteConfig = require('./svelte.config.js');

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

console.log("mode:", mode, "dev:", dev);

const markdown = () => ({
  transform(md, id) {
    if (!/\.md$/.test(id)) return null;
    const data = marked(md);
    return {
      code: `export default ${JSON.stringify(data.toString())};`
    };
  }
});

const dedupe = importee =>
  importee === "svelte" || importee.startsWith("svelte/");

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    warning.message.includes("/@sapper/")) ||
  onwarn(warning);

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      json(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      svelte({
        ...svelteConfig,
        dev,
        hydratable: true,
        emitCss: false
      }),
      resolve({
        browser: true,
        dedupe
      }),
      commonjs(),
      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          runtimeHelpers: true,
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead"
              }
            ]
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true
              }
            ]
          ]
        }),

      !dev &&
        terser({
          module: true
        })
    ],

    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      json(),
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      postcss({
        minimize: false,
        extract: path.resolve(__dirname, "./static/global.css")
      }),
      svelte({
        ...svelteConfig,
        generate: "ssr",
        dev
      }),
      resolve({ dedupe }),
      commonjs(),
      markdown()
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),

    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      commonjs(),
      !dev && terser()
    ],

    onwarn
  }
};
