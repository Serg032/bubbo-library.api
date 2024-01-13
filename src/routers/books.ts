import { Router, NextFunction, Response, Request } from "express";
import db from "../connection";
import { randomUUID } from "crypto";
import { Handler as CreateHandler } from "../books/app/commands/create/handler";
import { Handler as QuerybyIdHandler } from "../books/app/querys/get-by-id/handler";
import { Handler as QueryAllHandler } from "../books/app/querys/get-all/handler";
import { Handler as UpdateHandler } from "../books/app/commands/update/handler";
import { Handler as DeleteHandler } from "../books/app/commands/delete/handler";
import { ProductionRepository } from "../books/infrastructure/production-repository";
import { CreateCommand, UpdateCommand } from "../books/domain/domain";
import { z } from "zod";

const router = Router();
const repository = new ProductionRepository();
const createHandler = new CreateHandler(repository);
const queryByIdHandler = new QuerybyIdHandler(repository);
const queryAllHandler = new QueryAllHandler(repository);
const updateHandler = new UpdateHandler(repository);
const deleteHandler = new DeleteHandler(repository);

// middleware
router.use((req: Request, res: Response, next: NextFunction) => {
  const today = new Date();
  console.log(
    "Date:",
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );
  next();
});

const collection = db.collection("books");

// Endpoints
router.get("/", async (req, res) => {
  try {
    res.send({
      books: await queryAllHandler.handle(),
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error asking for all books", error });
  }
});

router.get("/:id", async (req, res) => {
  const idSchema = z.string();
  const parsedId = idSchema.parse(req.params.id);
  try {
    const book = await queryByIdHandler.handle(parsedId);
    if (book) {
      res.send({
        book,
        statusCode: 200,
      });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting the book", error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const bodySchema = z.object({
      name: z.string(),
      author: z.string(),
      publisher: z.string(),
      pages: z.number(),
    });

    const parsedBody = bodySchema.parse(req.body);
    await createHandler.handle({ ...parsedBody, id: randomUUID() });
    res.send({ message: "Book created", statusCode: 201 });
  } catch (error) {
    res.status(500).json({ message: "Error creating the book", error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const idSchema = z.string();
    const bodySchema = z.object({
      name: z.string().optional(),
      author: z.string().optional(),
      publisher: z.string().optional(),
      pages: z.number().optional(),
    });
    const parsedId = idSchema.parse(req.params.id);
    const parsedBody = bodySchema.parse(req.body);
    const command: UpdateCommand = {
      name: parsedBody.name,
      author: parsedBody.author,
      publisher: parsedBody.publisher,
      pages: parsedBody.pages,
    };
    const bookFromDatabase = await queryByIdHandler.handle(parsedId);
    if (bookFromDatabase) {
      await updateHandler.handle(
        {
          name: command.name ? command.name : bookFromDatabase.name,
          author: command.author ? command.author : bookFromDatabase.author,
          publisher: command.publisher
            ? command.publisher
            : bookFromDatabase.publisher,
          pages: command.pages ? command.pages : bookFromDatabase.pages,
        },
        req.params.id
      );
      res.send({
        message: "Book updated",
        statusCode: 200,
      });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating the book", error: error });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const idSchema = z.string();
    deleteHandler.handle(idSchema.parse(req.params.id));
    res.send({ message: "Book deleted", statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the book", error: error });
  }
});

export default router;
