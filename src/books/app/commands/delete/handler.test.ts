import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Fakerepository } from "../../../infrastructure/fake-repository";
import { Handler as CreateHandler } from "../create/handler";
import { randomUUID } from "node:crypto";
import { Handler } from "./handler";

describe("When deleting a book", () => {
  const repository = new Fakerepository();
  const handler = new Handler(repository);
  const createHandler = new CreateHandler(repository);
  const id = "1";
  beforeEach(async () => {
    await createHandler.handle({
      id,
      name: "test book",
      author: "test author",
      publisher: "test publisher",
      pages: 100,
    });
  });
  it("should be deleted", async () => {
    await handler.handle(id);
    const booksFromCollection = await repository.getAll();
    assert.equal(booksFromCollection.length, 0);
  });
  describe("when the book does not exist", () => {
    it("should not be deleted", async () => {
      await handler.handle(randomUUID());
      const booksFromCollection = await repository.getAll();
      assert.equal(booksFromCollection.length, 1);
    });
  });
});
