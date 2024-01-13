import { Book } from "../../../domain/domain";
import { Repository } from "../../../domain/repository";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(): Promise<Book[] | undefined[]> {
    return await this.repository.getAll();
  }
}
