import db from "../../connection";
import { Book, CreateCommand, UpdateCommand } from "../domain/domain";
import { Repository } from "../domain/repository";

export class ProductionRepository extends Repository {
  private collection = db.collection("books");
  async getById(id: string): Promise<Book | undefined> {
    const bookRef = await this.collection.doc(id).get();
    if (bookRef) {
      return bookRef.data() as Book;
    } else {
      throw new Error(`The book with id: ${id} doesn't exist.`);
    }
  }
  async create(command: CreateCommand): Promise<void> {
    const bookRef = this.collection.doc(command.id);
    await bookRef.set(command);
  }
  async getAll(): Promise<Book[] | undefined[]> {
    const booksRef = await this.collection.get();
    return booksRef.docs.map((doc) => doc.data() as Book);
  }
  async update(command: UpdateCommand, id: string): Promise<void> {
    const bookRef = this.collection.doc(id);
    await bookRef.update(command);
  }
  async delete(id: string): Promise<void> {
    const bookRef = this.collection.doc(id);
    if (bookRef) {
      await bookRef.delete();
    } else {
      throw new Error(`The book with id: ${id} doesn't exist.`);
    }
  }
}
