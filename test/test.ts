import { join } from 'path';

import test from 'ava';

import { OutputOptions } from 'rollup';

import helpers from './helpers/helpers';

import rollupStream from '..';

const { read, wait } = helpers;
const input = join(__dirname, 'fixtures/batman.js');
const output: OutputOptions = { format: 'cjs' };

test('exports', async (t) => {
  t.truthy(rollupStream);
  t.is(typeof rollupStream, 'function');
});

test('return Readable', async (t) => {
  const stream = rollupStream({});
  t.snapshot(stream.constructor.name);
});

test('pass rollup errors', async (t) => {
  const stream = rollupStream({});
  const result = await wait('error', stream);
  t.truthy(result);
  t.snapshot(result);
});

test('bundle event', async (t) => {
  const stream = rollupStream({ input, output });
  const bundle: any = await wait('bundle', stream);
  t.truthy(bundle);
  t.snapshot(bundle.cache.modules[0].ast);
  t.snapshot(bundle.cache.modules[0].code);
});

test('read content', async (t) => {
  const stream = rollupStream({ input, output });
  const result = await read(stream);
  t.truthy(result);
  t.snapshot(result);
});
