import test from 'ava';

import helpers from './helpers/helpers';

import rollupStream from '..';

const { read } = helpers;

test('sourcemap added', async (t) => {
  const stream = rollupStream({});
  const result = await read(stream);
  t.snapshot(result);
});

test('no sourcemap', async (t) => {
  const stream = rollupStream({});
  const result = await read(stream);
  t.snapshot(result);
});
