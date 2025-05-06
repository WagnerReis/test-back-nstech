import express from 'express';
import {
	atualizarStatusAgendamento,
	criarNovoAgendamento,
	deletarAgendamentosAntigos,
	listarTodosAgendamentos,
} from "../controllers/agendamentoController";

const router = express.Router();

router.get("/agendamentos", listarTodosAgendamentos);
router.post("/agendamentos", criarNovoAgendamento);
router.patch("/agendamentos/:id/status", atualizarStatusAgendamento);
router.delete("/agendamentos/antigos", deletarAgendamentosAntigos);

export default router;
