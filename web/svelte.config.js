//https://github.com/kaisermann/svelte-preprocess#with-svelte-vs-code

const sveltePreprocess = require('svelte-preprocess');
module.exports = {
  preprocess: sveltePreprocess({
    // uncomment to use Sass in your templates
    scss: {
      includePaths: ["src"]
    },
    postcss: true
  })
};

