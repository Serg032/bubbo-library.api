import { before, describe, it } from "node:test";
import { Fakerepository } from "../../../infrastructure/fake-repository";
import { CreateCommand } from "../../../domain/domain";
import { Handler as CreateHandler } from "../../commands/create/handler";
import assert from "node:assert/strict";
import { Handler } from "./handler";
import { randomUUID } from "node:crypto";

describe("When asking for a book", () => {
  const repository = new Fakerepository();
  const handler: Handler = new Handler(repository);
  const createBookHandle: CreateHandler = new CreateHandler(repository);
  const id = "1";
  const createHandlerCommand: CreateCommand = {
    id,
    name: "test book",
    author: "test author",
    publisher: "test publisher",
    pages: 111,
  };
  before(async () => {
    await createBookHandle.handle(createHandlerCommand);
  });
  it("shoud return the correct book", async () => {
    const book = await handler.handle(id);
    assert.equal(book?.id, id);
  });
  describe("when the book does not exist", () => {
    it("should return undefined", async () => {
      const book = await handler.handle(randomUUID());
      assert.equal(book, undefined);
    });
  });
});
