import { AppDataSource } from "../data-source";
import { Livro } from "../entities/Livro";

export const LivroRepository = AppDataSource.getRepository(Livro);
