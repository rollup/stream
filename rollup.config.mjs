/* eslint-disable import/no-extraneous-dependencies */

import { readFileSync } from 'fs';

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default {
  external: ['path', 'rollup', 'stream'],
  input: 'src/index.ts',
  output: [
    { exports: 'auto', file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    resolve(),
    commonjs({ include: './node_modules/**' }),
    typescript({ include: '**/*.{ts,js}' })
  ],
  strictDeprecations: true
};
