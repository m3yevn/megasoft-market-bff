const cache = {};

class CacheService {
  async getCacheOrTriggerAPI(key, apiPromise, duration = 5000) {
    const cacheDuration = Date.now() - cache[key]?.lastAccessed;
    if (cacheDuration < duration) {
      return cache[key];
    }

    const result = await apiPromise;

    cache[key] = {
      lastAccessed: Date.now(),
      data: result.data,
    };

    return result;
  }
}

module.exports = new CacheService();
