import tap from "tap";
import Redis from "ioredis-mock";
import { RedisService } from "../lib/redis.js";

tap.test(
  "set and get methods - should set the object { user.flallo95: Fabrizio Lallo }",
  async (t) => {
    const redisMock = new Redis({
      data: {}
    });
    const redisService = new RedisService(redisMock);

    await redisService.set("user.flallo95", "Fabrizio Lallo");

    const valueToCheck = await redisService.get("user.flallo95");
    t.equal(valueToCheck, "Fabrizio Lallo");
  }
);

tap.test("deleteAllKeys method - should delete all the objects", async (t) => {
  const redisMock = new Redis({
    data: {
      user_next: "3",
      emails: {
        "clark@daily.planet": "1",
        "bruce@wayne.enterprises": "2"
      },
      "user:1": { id: "1", username: "superman", email: "clark@daily.planet" },
      "user:2": {
        id: "2",
        username: "batman",
        email: "bruce@wayne.enterprises"
      }
    }
  });
  const redisService = new RedisService(redisMock);

  let numberOfKeys = await redisMock.dbsize();
  t.equal(numberOfKeys, 4);

  await redisService.deleteAllKeys();

  numberOfKeys = await redisMock.dbsize();
  t.equal(numberOfKeys, 0);
});
