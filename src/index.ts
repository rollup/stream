import { Readable } from 'stream';

import { rollup, RollupOptions } from 'rollup';

const build = async (options: RollupOptions, stream: Readable) => {
  const bundle = await rollup(options);

  stream.emit('bundle', bundle);

  const { output } = await bundle.generate(options.output);

  for (const chunk of output) {
    if (chunk.type === 'asset') {
      stream.push(chunk.source);
    } else {
      stream.push(chunk.code);

      if (chunk.map) {
        stream.push(`\n//# sourceMappingURL=${chunk.map.toUrl()}`);
      }
    }
  }

  // signal end of write
  stream.push(null);
};

const stream = (options: RollupOptions) => {
  const result = new Readable({
    // stub _read() as it's not available on Readable stream, needed by gulp et al
    read: () => {}
  });

  build(options, result).catch((error) => {
    result.emit('error', error);
  });

  return result;
};

export default stream;
