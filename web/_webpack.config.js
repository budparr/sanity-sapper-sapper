const webpack = require("webpack");
const config = require("sapper/config/webpack.js");
const pkg = require("./package.json");

// CSS/TAILWIND
//const sveltePreprocess = require('svelte-preprocess');
const preprocess = require("svelte-preprocess")({  
  postcss: true
});

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssConfig = {
  test: /\.(sa|sc|c)ss$/,
  exclude: /node_modules/,
  use: [
    "isomorphic-style-loader",
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === "development"
      }
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 2
      }
    },
    "postcss-loader"
  ]
};
//console.log('h', cssConfig)

// END CSS/TAILWIND

const mode = process.env.NODE_ENV;
const dev = mode !== "production";

const extensions = [".mjs", ".js", ".json", ".svelte", ".html"];
const mainFields = ["svelte", "module", "browser", "main"];

const svelteClient = {
  test: /\.(svelte|html)$/,
  use: {
    loader: "svelte-loader",
    options: {
      preprocess,
      dev,
      hydratable: true,
      hotReload: false // pending https://github.com/sveltejs/svelte/issues/2377
    }
  }
};

const svelteServer = {
  test: /\.(svelte|html)$/,
  use: {
    loader: "svelte-loader",
    options: {
      preprocess,
      css: false,
      generate: "ssr",
      dev
    }
  }
};
console.log("mode", mode, "dev", dev);

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { extensions, mainFields },
    module: {
      rules: [cssConfig, svelteClient]
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      //dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      new MiniCssExtractPlugin({
        filename: dev
          ? "../../../static/global.css"
          : "../../../static/global.[hash:5].css",
        chunkFilename: "[id].[hash:5].css"
      })
    ].filter(Boolean),
    devtool: dev && "inline-source-map"
  },
  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: "node",
    resolve: { extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat("encoding"),
    module: {
      rules: [cssConfig, svelteServer]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: dev
          ? "../../../static/global.css"
          : "../../../static/global.[hash:5].css",
        chunkFilename: "[id].[hash:5].css"
      })
    ],
    mode: process.env.NODE_ENV,
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },
  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
};
