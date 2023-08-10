//efficiently bundles third party dependencies we've installed and use in node_modules
import resolve from "@rollup/plugin-node-resolve";

// //enables transpilation into CommonJS (CJS) format
import commonjs from "@rollup/plugin-commonjs";

//transpiled our TypeScript code into JavaScript. This plugin will use all the settings we have set in tsconfig.json.
//We set "useTsconfigDeclarationDir": true so that it outputs the .d.ts files in the directory specified by in tsconfig.json
import typescript from "rollup-plugin-typescript2";

// transforms our Sass into CSS. In order to get this plugin working with Sass, we've installed sass
import replace from 'rollup-plugin-replace';

const packageJson = require("./package.json");

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.module,
      format: "esm", // import '' from  '...
      sourcemap: true,
    },
    {
      file: packageJson.main,
      format: "iife", // import '' from  '...
      name: "Heremap",
      globals: {
        "react": 'React',
        'react-dom': 'ReactDOM'
      }
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    replace({
        'process.env.NODE_ENV': JSON.stringify('development') // Set production mode
      })
  ],
  external: ["react", "react-dom"],
};
