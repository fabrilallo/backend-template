import buildServer from "./index.js";
import { KeyValueStorage } from "@generator-scaffold/storage";
const keyValueStorageClient = new KeyValueStorage(
  "redis",
  String(process.env.REDIS_HOST),
  process.env.REDIS_PORT
);

const fastify = buildServer(keyValueStorageClient);

const start = async function () {
  try {
    const API_PORT = process.env.API_PORT;
    const API_HOST = process.env.API_HOST;
    await fastify.listen(API_PORT, API_HOST);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
