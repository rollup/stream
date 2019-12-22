import test from 'ava';

import helpers from './helpers/helpers';

import rollupStream from '..';

const { read } = helpers;

test('exports', async (t) => {
  const stream = rollupStream({});
  const result = await read(stream);
  t.snapshot(result);
});

test('pass rollup errors', async (t) => {
  const stream = rollupStream({});
  const result = await read(stream);
  t.snapshot(result);
});

test('return Readable', async (t) => {
  const stream = rollupStream({});
  const result = await read(stream);
  t.snapshot(result);
});

test('bundle event', async (t) => {
  const stream = rollupStream({});
  const result = await read(stream);
  t.snapshot(result);
});
