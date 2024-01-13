import { CreateCommand } from "../../../domain/domain";
import { Repository } from "../../../domain/repository";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(command: CreateCommand) {
    await this.repository.create(command);
  }
}
