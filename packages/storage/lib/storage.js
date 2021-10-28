import { RedisService } from "./redis.js";
import { InMemoryService } from "./inMemory.js";
import Redis from "ioredis";

const storages = {
  REDIS: "redis",
  IN_MEMORY: "in_memory"
};

export class KeyValueStorage {
  #storageInstance;

  constructor(storage, host, port) {
    switch (storage) {
      case storages.IN_MEMORY:
        this.#storageInstance = new InMemoryService();
        break;
      case storages.REDIS:
      default:
        const redisClient = new Redis({ host, port });
        this.#storageInstance = new RedisService(redisClient);
      // TODO: add other key value storages
    }
  }

  async set(key, value) {
    const result = await this.#storageInstance.set(key, value);
    if (!result) {
      return false;
    }

    return true;
  }

  async get(key) {
    const result = await this.#storageInstance.get(key);
    if (!result) {
      return undefined;
    }

    return result;
  }

  async deleteAllKeys() {
    await this.#storageInstance.deleteAllKeys();
  }
}
