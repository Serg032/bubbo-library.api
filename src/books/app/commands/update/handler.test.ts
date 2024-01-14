import { afterEach, beforeEach, describe, it } from "node:test";
import { Fakerepository } from "../../../infrastructure/fake-repository";
import { UpdateCommand } from "../../../domain/domain";
import { Handler as CreateHandler } from "../create/handler";
import { Handler as QueryByIdHandler } from "../../querys/get-by-id/handler";
import assert from "node:assert/strict";
import { Handler } from "./handler";
import { randomUUID } from "node:crypto";

describe("When updating a book", () => {
  const repository = new Fakerepository();
  const handler = new Handler(repository);
  const createHandler = new CreateHandler(repository);
  const queryHandler = new QueryByIdHandler(repository);
  const id = "1";

  beforeEach(() => {
    createHandler.handle({
      id,
      name: "book name",
      author: "book author",
      publisher: "book publisher",
      pages: 100,
      img: "image url",
    });
  });
  afterEach(async () => {
    await repository.delete(id);
  });
  it("should be updated correctly", async () => {
    const updateCommand: UpdateCommand = {
      name: "Jonh Resig Biography",
      pages: 500,
    };

    handler.handle(updateCommand, id);
    const bookFromCollection = await queryHandler.handle(id);
    assert.equal(bookFromCollection?.name, updateCommand.name);
    assert.equal(bookFromCollection?.pages, updateCommand.pages);
    assert.equal(bookFromCollection?.author, "book author");
    assert.equal(bookFromCollection?.publisher, "book publisher");
  });
  describe("when the book does not exist", () => {
    it("should not be updated", async () => {
      const updateCommand: UpdateCommand = {
        name: "Jonh Resig Biography",
        pages: 500,
      };
      await handler.handle(updateCommand, randomUUID());
      const bookFromCollection = await queryHandler.handle(id);
      assert.equal(bookFromCollection?.name, "book name");
      assert.equal(bookFromCollection?.pages, 100);
      assert.equal(bookFromCollection?.author, "book author");
      assert.equal(bookFromCollection?.publisher, "book publisher");
    });
  });
});
