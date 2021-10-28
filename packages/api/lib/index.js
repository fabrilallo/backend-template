import arecibo from "arecibo";
import dotenv from "dotenv";
import Fastify from "fastify";
import autoload from "fastify-autoload";
import metrics from "fastify-metrics";
import path from "path";
dotenv.config();
const __dirname = path.resolve();

function buildServer(keyValueStorageClient) {
  const TESTING = process.env.TESTING;

  let fastify;
  if (!TESTING) {
    fastify = Fastify({
      logger: {
        level: "info"
      }
    });
  } else {
    fastify = Fastify({
      logger: false
    });
  }
  fastify.decorateRequest("keyValueStorageClient", null);

  fastify.addHook("onRequest", async (req, _reply) => {
    req.keyValueStorageClient = keyValueStorageClient;
  });

  fastify.register(arecibo, {
    readinessURL: "/readiness", // optional, deafult to /arecibo/readiness
    livenessURL: "/liveness", // optional, deafult to /arecibo/liveness
    logLevel: "error" // optional, defaults to 'info'; can be trace, debug, info, warn, error, and fatal
  });
  fastify.register(metrics, {
    endpoint: "/metrics"
  });

  fastify.register(autoload, {
    dir: path.join(__dirname, "lib/routes")
    // options: opts
  });

  fastify.log.info("Fastify is starting up!");

  return fastify;
}

export default buildServer;
