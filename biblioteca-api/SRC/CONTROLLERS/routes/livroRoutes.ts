import { Router } from "express";
import { LivroController } from "../controllers/LivroController";

const router = Router();
const controller = new LivroController();

router.post("/", controller.criar);
router.get("/", controller.listarTodos);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.patch("/:id", controller.atualizarParcial);
router.delete("/:id", controller.excluir);

export default router;
