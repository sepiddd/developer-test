import { testApiHandler } from "next-test-api-route-handler";
import handler from "./add";

describe("add reviews", () => {
  it("allows to create a review", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify({
            name: "The place to be",
            text: "Nobody knows what this should be.",
            stars: 1,
          }),
        });
        expect(await res.json()).toMatchObject({
          name: "The place to be",
          text: "Nobody knows what this should be.",
          stars: 1,
        });
      },
    });
  });
});
