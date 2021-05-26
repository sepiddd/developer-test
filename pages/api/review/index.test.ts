import { testApiHandler } from "next-test-api-route-handler";
import handler from "./index";

describe("list reviews", () => {
  it("allows to list all reviews", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
        });
        expect(await res.json()).toHaveLength(4);
      },
    });
  });
});
