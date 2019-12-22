import { Readable } from 'stream';

import { rollup, RollupOptions } from 'rollup';

const build = async (options: RollupOptions, stream: Readable) => {
  try {
    const bundle = await rollup(options);

    stream.emit('bundle', bundle);

    const { output } = await bundle.generate(options);

    // OuputChunk | OutputAsset. TypeScript can't destructure a union type.
    for (const { code, isAsset, map, source } of output as any) {
      if (isAsset) {
        stream.push(source);
        continue; // eslint-disable-line no-continue
      }

      stream.push(code);

      if (map) {
        stream.push(`\n//# sourceMappingURL=${map.toUrl()}`);
      }
    }

    // signal end of write
    stream.push(null);
  } catch (error) {
    stream.emit('error', error);
  }
};

const stream = (options: RollupOptions) => {
  const result = new Readable();

  // stub _read() as it's not available on Readable stream, needed by gulp et al
  result._read = () => {}; // eslint-disable-line no-underscore-dangle

  build(options, result).catch(() => {});

  return result;
};

export default stream;
