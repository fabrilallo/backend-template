import { createUserSchema, getUserSchema } from "../schemas/user.js";

import createHttpError from "http-errors";
export default async (fastify) => {
  fastify.get(
    "/users/:username",
    { schema: getUserSchema },
    async (req, reply) => {
      const { keyValueStorageClient } = req;
      req.log.info("Get user route called");

      // TODO: replace with storage module
      const fullName = await keyValueStorageClient.get(
        `user.${req.params.username}`
      );

      if (!fullName) {
        throw createHttpError(404, "User not found");
      }

      return reply.code(200).send({ data: { fullName } });
    }
  );

  fastify.post("/users", { schema: createUserSchema }, async (req, reply) => {
    const { keyValueStorageClient } = req;
    req.log.info("Create user route called");

    // TODO: replace with storage module
    await keyValueStorageClient.set(
      `user.${req.body.username}`,
      `${req.body.name} ${req.body.surname}`
    );

    return reply.code(201).send({ message: "User created" });
  });
};
