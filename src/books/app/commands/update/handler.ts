import { UpdateCommand } from "../../../domain/domain";
import { Repository } from "../../../domain/repository";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(command: UpdateCommand, id: string): Promise<void> {
    this.repository.update(command, id);
  }
}
