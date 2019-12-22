import { join } from 'path';

import test from 'ava';
import { OutputOptions } from 'rollup';

import helpers from './helpers/helpers';

import rollupStream from '..';

const { read } = helpers;
const input = join(__dirname, 'fixtures/batman.js');
const output: OutputOptions = { format: 'cjs', sourcemap: true };

test('sourcemap added', async (t) => {
  const stream = rollupStream({ input, output });
  const result = await read(stream);
  t.snapshot(result);
});

test('no sourcemap', async (t) => {
  const stream = rollupStream({ input, output: { format: 'cjs' } });
  const result = await read(stream);
  t.snapshot(result);
});
