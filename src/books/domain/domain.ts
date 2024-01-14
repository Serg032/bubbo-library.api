export interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  pages: number;
  img: string;
}

export interface CreateCommand extends Book {}
export interface UpdateCommand extends Omit<Partial<CreateCommand>, "id"> {}
