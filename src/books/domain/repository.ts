import { Book, CreateCommand, UpdateCommand } from "./domain";

export abstract class Repository {
  abstract getById(id: string): Promise<Book | undefined>;
  abstract getAll(): Promise<Book[] | undefined[]>;
  abstract create(command: CreateCommand): Promise<void>;
  abstract update(command: UpdateCommand, id: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
