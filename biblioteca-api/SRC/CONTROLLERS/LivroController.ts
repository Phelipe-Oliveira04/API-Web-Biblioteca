import { Request, Response } from "express";
import { LivroRepository } from "../repositories/LivroRepository";
import { Livro } from "../entities/Livro";

export class LivroController {
  async criar(req: Request, res: Response) {
    const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

    if (!titulo || !autor || !isbn || !anoPublicacao) {
      return res
        .status(400)
        .json({
          mensagem: "Todos os campos obrigatórios devem ser preenchidos",
        });
    }

    const isbnExiste = await LivroRepository.findOneBy({ isbn });
    if (isbnExiste) {
      return res.status(400).json({ mensagem: "ISBN já cadastrado" });
    }

    const novoLivro = LivroRepository.create({
      titulo,
      autor,
      isbn,
      anoPublicacao,
      disponivel: disponivel ?? true,
    });

    await LivroRepository.save(novoLivro);
    return res.status(201).json(novoLivro);
  }

  // READ ALL
  async listarTodos(req: Request, res: Response) {
    const livros = await LivroRepository.find();
    return res.json(livros);
  }

  // READ BY ID
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const livro = await LivroRepository.findOneBy({ id: Number(id) });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }
    return res.json(livro);
  }

  // UPDATE (PUT - completo)
  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const dados = req.body;

    const livro = await LivroRepository.findOneBy({ id: Number(id) });
    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    if (dados.isbn && dados.isbn !== livro.isbn) {
      const isbnExiste = await LivroRepository.findOneBy({ isbn: dados.isbn });
      if (isbnExiste) {
        return res
          .status(400)
          .json({ mensagem: "ISBN já está sendo usado por outro livro" });
      }
    }

    LivroRepository.merge(livro, dados);
    const resultado = await LivroRepository.save(livro);
    return res.json(resultado);
  }

  // PATCH (parcial)
  async atualizarParcial(req: Request, res: Response) {
    return this.atualizar(req, res);
  }

  // DELETE
  async excluir(req: Request, res: Response) {
    const { id } = req.params;
    const resultado = await LivroRepository.delete({ id: Number(id) });

    if (resultado.affected === 0) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }
    return res.status(204).send();
  }
}
