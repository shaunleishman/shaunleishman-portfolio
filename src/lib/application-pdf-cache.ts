/**
 * One rendered application PDF per process.
 * The filename month is not part of the stamp. A failed render is not stored.
 * Callers copy the buffer into the response. Do not mutate the cached buffer.
 */

type CacheEntry = {
  stamp: string;
  buffer: Buffer;
};

const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<Buffer>>();
const latestStamp = new Map<string, string>();

export function getCachedPdfBuffer(
  key: string,
  stamp: string,
  render: () => Promise<Buffer>,
): Promise<Buffer> {
  latestStamp.set(key, stamp);
  const hit = cache.get(key);
  if (hit?.stamp === stamp) return Promise.resolve(hit.buffer);

  const flightKey = `${key}\0${stamp}`;
  const pending = inflight.get(flightKey);
  if (pending) return pending;

  const promise = render()
    .then((buffer) => {
      if (latestStamp.get(key) === stamp) {
        cache.set(key, { stamp, buffer });
      }
      return buffer;
    })
    .finally(() => {
      inflight.delete(flightKey);
    });

  inflight.set(flightKey, promise);
  return promise;
}
