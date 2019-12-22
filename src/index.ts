import { Readable } from 'stream';

import { rollup, RollupOptions } from 'rollup';

const build = async (options: RollupOptions, stream: Readable) => {
  const bundle = await rollup(options);
  const { emit, push } = stream;

  emit('bundle', bundle);

  const { output } = await bundle.generate(options);

  // OuputChunk | OutputAsset. TypeScript can't destructure a union type.
  for (const { code, isAsset, map, source } of output as any) {
    if (isAsset) {
      push(source);
      continue; // eslint-disable-line no-continue
    }

    stream.push(code);

    if (map) {
      push(`\n//# sourceMappingURL=${map.toUrl()}`);
    }
  }

  // signal end of write
  push(null);
};

const stream = (options: RollupOptions) => {
  const result = new Readable();
  const { emit } = result;

  result._read = () => {}; // eslint-disable-line no-underscore-dangle

  build(options, result).catch((error) => emit('error', error));

  return result;
};

export default stream;
