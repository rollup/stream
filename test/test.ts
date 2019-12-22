import { Readable } from 'stream';

import test from 'ava';

import rollupStream from '..';

const read(stream: Readable) {
  return new Promise((p, f) => {
    let data = '';
    stream.on('end', () => p(data));
    stream.on('error', (err) => f(err));
    stream.on('data', (chunk) => {
      data += chunk.toString();
    });
  });
}

test('exports', () => {});

test('pass rollup errors', () => {});

test('return Readable', () => {});

test('bundle event', () => {});
