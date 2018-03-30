import resolve from "rollup-plugin-node-resolve"
import sourcemaps from "rollup-plugin-sourcemaps"

export default {
    input: ".temp/index.js",
    output: {
        file: "index.mjs",
        format: "es",
        sourcemap: true,
        sourcemapFile: "index.mjs.map",
        strict: true,
        banner: `/*! @author Toru Nagashima <https://github.com/mysticatea> */`,
    },
    plugins: [sourcemaps(), resolve()],
}
