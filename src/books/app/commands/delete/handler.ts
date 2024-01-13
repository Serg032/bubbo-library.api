import { Repository } from "../../../domain/repository";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(id: string) {
    await this.repository.delete(id);
  }
}
