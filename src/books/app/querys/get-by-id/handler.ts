import { Book } from "../../../domain/domain";
import { Repository } from "../../../domain/repository";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(id: string): Promise<Book | undefined> {
    return await this.repository.getById(id);
  }
}
