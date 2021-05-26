import { testApiHandler } from "next-test-api-route-handler";
import database, { reviewsFixture } from "../../../src/utils/database";
import handler from "./[id]";

describe("read, update and delete reviews", () => {
  it("allows to read a single review", async () => {
    await testApiHandler({
      handler,
      params: { id: 1 },
      test: async ({ fetch }) => {
        const res = await fetch({ method: "GET" });
        expect(await res.json()).toMatchObject({ id: 1 });
      },
    });
  });

  it("disallows to read a non-existing single review", async () => {
    await testApiHandler({
      handler,
      params: { id: 999 },
      test: async ({ fetch }) => {
        const res = await fetch({ method: "GET" });
        expect(res.status).toBe(404);
      },
    });
  });

  it("allows to update the name of a single review", async () => {
    await testApiHandler({
      handler,
      params: { id: 1 },
      test: async ({ fetch }) => {
        const before = database.review.get(1);
        const res = await fetch({
          method: "PUT",
          body: JSON.stringify({
            name: "Tricatel Gas Station",
          }),
        });
        const body = await res.json();
        expect(body["name"]).toBe("Tricatel Gas Station");
        expect(body["text"]).toBe(before.text);
      },
    });
  });

  it("disallows updating the name of a non-existing single review", async () => {
    await testApiHandler({
      handler,
      params: { id: 999 },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PUT",
          body: JSON.stringify({
            name: "Tricatel Gas Station",
          }),
        });
        expect(res.status).toBe(404);
      },
    });
  });

  it("allows to delete a single review", async () => {
    await testApiHandler({
      handler,
      params: { id: 1 },
      test: async ({ fetch }) => {
        const res = await fetch({ method: "DELETE" });
        expect(res.status).toBe(200);
      },
    });
  });

  it("disallows to delete a non-existing review", async () => {
    await testApiHandler({
      handler,
      params: { id: 99 },
      test: async ({ fetch }) => {
        const res = await fetch({ method: "DELETE" });
        expect(res.status).toBe(404);
      },
    });
  });
});
