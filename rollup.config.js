import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const input = 'src/index.ts';
const globals = { react: 'React' };
const external = Object.keys(globals).concat('@babel/runtime');
const license = {
  output: {
    preamble: [
      '/**',
      ' * react-toastsnack v' + process.env.npm_package_version,
      ' *',
      ' * Copyright (c) 2019 babangsund',
      ' *',
      ' * This source code is licensed under the MIT license found in the',
      ' * LICENSE file in the root directory of this source tree.',
      ' */',
    ].join('\n'),
  },
};

export default {
  input,
  external,
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      plugins: [['@babel/transform-runtime', { useESModules: true }]],
    }),
    nodeResolve(),
    typescript(),
    commonjs(),
    process.env.NODE_ENV === 'production' && terser(license),
  ],
  output: [
    {
      globals,
      format: 'esm',
      file: pkg.module,
    },
    {
      globals,
      format: 'cjs',
      file: pkg.main,
    },
    {
      globals,
      format: 'umd',
      name: 'ReactToastSnack',
      file: `dist/index.umd.${process.env.NODE_ENV}.js`,
    },
  ],
};
