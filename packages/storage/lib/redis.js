export class RedisService {
  #redisInstance;

  constructor(redisClient) {
    this.#redisInstance = redisClient;
  }
  async set(key, value) {
    const result = await this.#redisInstance.set(key, value);
    return result;
  }

  async get(key) {
    const result = await this.#redisInstance.get(key);
    return result;
  }

  async deleteAllKeys() {
    await this.#redisInstance.flushall();
  }
}
