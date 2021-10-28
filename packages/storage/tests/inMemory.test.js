import tap from "tap";
import { InMemoryService } from "../lib/inMemory.js";

tap.test(
  "set and get methods - should set the object { user.flallo95: Fabrizio Lallo }",
  async (t) => {
    const inMemoryService = new InMemoryService();

    inMemoryService.set("user.flallo95", "Fabrizio Lallo");

    const valueToCheck = inMemoryService.get("user.flallo95");
    t.equal(valueToCheck, "Fabrizio Lallo");
  }
);

tap.test("deleteAllKeys method - should delete all the objects", async (t) => {
  const inMemoryService = new InMemoryService();

  inMemoryService.set("user.flallo95", "Fabrizio Lallo");

  let valueToCheck = inMemoryService.get("user.flallo95");
  t.equal(valueToCheck, "Fabrizio Lallo");

  inMemoryService.deleteAllKeys();
  valueToCheck = inMemoryService.get("user.flallo95");

  t.equal(valueToCheck, undefined);
});
