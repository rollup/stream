import { Readable } from 'stream';

const read = (stream: Readable) =>
  new Promise((p, f) => {
    let data = '';
    stream.on('end', () => p(data));
    stream.on('error', (err) => f(err));
    stream.on('data', (chunk) => {
      data += chunk.toString();
    });
  });

export default { read };
