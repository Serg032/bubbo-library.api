import { before, describe, it } from "node:test";
import { Fakerepository } from "../../../infrastructure/fake-repository";
import { Repository } from "../../../domain/repository";
import { Handler as CreateHandler } from "../../commands/create/handler";
import { CreateCommand } from "../../../domain/domain";
import { randomUUID } from "node:crypto";
import assert from "node:assert/strict";
import { Handler } from "./handler";

describe("When asking for all the books", () => {
  const repository = new Fakerepository();
  const handler = new Handler(repository);
  const createHandler = new CreateHandler(repository);
  const createCommands: CreateCommand[] = [
    {
      id: randomUUID(),
      name: "first book",
      author: "first author",
      publisher: "first publisher",
      pages: 100,
      img: "image url",
    },
    {
      id: randomUUID(),
      name: "second book",
      author: "second author",
      publisher: "second publisher",
      pages: 200,
      img: "image url",
    },
  ];
  before(async () => {
    await Promise.all(
      createCommands.map(async (command) => await createHandler.handle(command))
    );
  });
  it("should return all the books", () => {
    handler.handle().then((books) => {
      assert.equal(books.length, 2);
      assert.equal(books[0]?.id, createCommands[0].id);
      assert.equal(books[1]?.id, createCommands[1].id);
      assert.equal(books[0]?.name, createCommands[0].name);
      assert.equal(books[1]?.name, createCommands[1].name);
      assert.equal(books[0]?.author, createCommands[0].author);
      assert.equal(books[1]?.author, createCommands[1].author);
      assert.equal(books[0]?.publisher, createCommands[0].publisher);
      assert.equal(books[1]?.publisher, createCommands[1].publisher);
      assert.equal(books[0]?.pages, createCommands[0].pages);
      assert.equal(books[1]?.pages, createCommands[1].pages);
    });
  });
});
