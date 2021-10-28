import tap from "tap";
import buildServer from "../lib/index.js";
import { KeyValueStorage } from "@generator-scaffold/storage";

const keyValueStorageClient = new KeyValueStorage(
  "in_memory",
  undefined,
  undefined
);
const app = buildServer(keyValueStorageClient);

tap.afterEach(async () => {
  await keyValueStorageClient.deleteAllKeys();
});

tap.test("GET users routes - should return user's fullname", async (t) => {
  await keyValueStorageClient.set("user.flallo", "Fabrizio Lallo");
  const response = await app.inject({
    method: "GET",
    url: "/users/flallo"
  });

  const parsedBody = JSON.parse(response.body);
  t.equal(response.statusCode, 200, "Response status code should be 200");
  t.equal(
    parsedBody.data.fullName,
    "Fabrizio Lallo",
    "Response should contain the fullname Fabrizio Lallo"
  );
});

tap.test(
  "GET users routes - should not find the user's fullname",
  async (t) => {
    const response = await app.inject({
      method: "GET",
      url: "/users/flallo"
    });

    const parsedBody = JSON.parse(response.body);
    t.equal(response.statusCode, 404, "Response status code should be 200");
    t.equal(
      parsedBody.message,
      "User not found",
      "Response should contain the message that the user wasn't found"
    );
  }
);

tap.test("POST users routes - should save user's fullname", async (t) => {
  const response = await app.inject({
    method: "POST",
    url: "/users",
    body: {
      name: "Fabrizio",
      surname: "Lallo",
      username: "flallo"
    }
  });

  const parsedBody = JSON.parse(response.body);
  t.equal(response.statusCode, 201, "Response status code should be 201");
  t.equal(
    parsedBody.message,
    "User created",
    "Response should contain the message 'User created'"
  );

  t.equal(
    await keyValueStorageClient.get("user.flallo"),
    "Fabrizio Lallo",
    "Given the key 'user.flallo' the value should be 'Fabrizio Lallo'"
  );
});
