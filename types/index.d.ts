import { Readable } from 'stream';

import { RollupOptions } from 'rollup';

declare const stream: (options: RollupOptions) => Readable;
export default stream;
