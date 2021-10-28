export class InMemoryService {
  #storage;

  constructor() {
    this.#storage = [];
  }
  set(key, value) {
    const result = this.#storage.push({ key, value });
    return result;
  }

  get(key) {
    const result = this.#storage.find((obj) => obj.key === key);
    
    return result && result.value;
  }

  deleteAllKeys() {
    this.#storage.length = 0;
  }
}
