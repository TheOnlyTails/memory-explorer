import adapter from "@sveltejs/adapter-auto"
import preprocess from "svelte-preprocess"
import cssnano from "cssnano"
import autoprefixer from "autoprefixer"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [autoprefixer(), cssnano()]
    }
  }),

  kit: {
    adapter: adapter()
  }
}

export default config
