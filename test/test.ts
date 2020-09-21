import { join } from 'path';

import test from 'ava';

import { OutputOptions, Plugin, RollupBuild } from 'rollup';

import rollupStream from '..';

import helpers from './helpers/helpers';

const { read, wait } = helpers;
const input = join(__dirname, 'fixtures/batman.js');
const output: OutputOptions = { format: 'cjs', exports: 'auto' };

test('exports', async (t) => {
  t.truthy(rollupStream);
  t.is(typeof rollupStream, 'function');
});

test('return Readable', async (t) => {
  const stream = rollupStream({}).on('error', () => {});
  t.is(stream.constructor.name, 'Readable');
});

test('pass rollup errors', async (t) => {
  const stream = rollupStream({});
  const result = await wait('error', stream);
  t.truthy(result);
  t.truthy(result instanceof Error);
  t.snapshot(result);
});

test('bundle event', async (t) => {
  const stream = rollupStream({ input, output });
  const bundle = (await wait('bundle', stream)) as RollupBuild;
  t.truthy(bundle);
  const cache = bundle.cache!;
  t.snapshot(cache.modules[0].ast);
  t.snapshot(cache.modules[0].code);
});

test('read content', async (t) => {
  const stream = rollupStream({ input, output });
  const result = await read(stream);
  t.truthy(result);
  t.snapshot(result);
});

test('plugin build no warnings', async (t) => {
  let noWarnings = true;
  const testPlugin: Plugin = {
    name: 'test-plugin',
    buildStart: () => {}
  };
  const plugins = [testPlugin];
  const stream = rollupStream({
    input,
    output,
    plugins,
    onwarn: () => {
      noWarnings = false;
    }
  });
  const result = await read(stream);
  t.truthy(result);
  t.truthy(noWarnings);
  t.snapshot(noWarnings);
});
