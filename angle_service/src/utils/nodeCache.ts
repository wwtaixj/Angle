import NodeCache from 'node-cache';

class Cache {
  cache: NodeCache;
  constructor(ttlSeconds?: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  get<T>(key: NodeCache.Key) {
    return this.cache.get<T>(key);
  }

  set<T>(key: NodeCache.Key, value: T, ttl?: number | string) {
    return this.cache.set(key, value, ttl);
  }

  del(keys: NodeCache.Key | NodeCache.Key[]) {
    return this.cache.del(keys);
  }

  // 获取缓存中所有键
  keys() {
    return this.cache.keys();
  }

  // 清空缓存
  flush() {
    return this.cache.flushAll();
  }
}

export default Cache;
