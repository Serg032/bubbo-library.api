import { describe, it } from "node:test";
import { Handler } from "./handler";
import { Handler as QueryHandler } from "../../querys/get-by-id/handler";
import assert from "node:assert/strict";
import { Fakerepository } from "../../../infrastructure/fake-repository";

describe("When creating a book", () => {
  const repository = new Fakerepository();
  const handler: Handler = new Handler(repository);
  const queryHandler: QueryHandler = new QueryHandler(repository);
  const id = "1";
  it("should be created", async () => {
    await handler.handle({
      id,
      name: "test book",
      author: "test author",
      publisher: "test author",
      pages: 100,
      img: "image url",
    });
    const book = await queryHandler.handle(id);
    assert.equal(book?.id, id);
  });
});
