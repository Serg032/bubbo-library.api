import { Book, CreateCommand, UpdateCommand } from "../domain/domain";
import { Repository } from "../domain/repository";

export class Fakerepository extends Repository {
  private collection: Set<Book> = new Set();

  async getAll(): Promise<Book[] | undefined[]> {
    return Array.from(this.collection.values());
  }

  async getById(id: string): Promise<Book | undefined> {
    return Array.from(this.collection).find((book) => book.id === id);
  }

  async create(command: CreateCommand): Promise<void> {
    this.collection.add({
      id: command.id,
      name: command.name,
      author: command.author,
      publisher: command.publisher,
      pages: command.pages,
    });
  }

  async update(command: UpdateCommand, id: string): Promise<void> {
    const bookFromCollection = Array.from(this.collection).find(
      (book) => book.id === id
    );
    if (bookFromCollection) {
      if (command.name) {
        bookFromCollection.name = command.name;
      }
      if (command.author) {
        bookFromCollection.author = command.author;
      }
      if (command.publisher) {
        bookFromCollection.publisher = command.publisher;
      }
      if (command.pages) {
        bookFromCollection.pages = command.pages;
      }
    } else {
      console.warn(`The book with id: ${id} doesn't exist.`);
    }
  }
  async delete(id: string): Promise<void> {
    const bookFromCollection = Array.from(this.collection).find(
      (book) => book.id === id
    );
    if (bookFromCollection) {
      this.collection.delete(bookFromCollection);
    } else {
      console.warn(`The book with id: ${id} doesn't exist.`);
    }
  }
}
