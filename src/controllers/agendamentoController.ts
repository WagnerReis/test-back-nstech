import { Request, Response } from 'express';
import {
	alterarStatus,
	criarAgendamento,
	listarAgendamentos,
	removerAgendamentosAntigos,
} from "../services/agendamentoService";
import { parseISO } from "date-fns";

export const criarNovoAgendamento = (req: Request, res: Response) => {
	const agendamento = req.body;

	console.log("agendamento: ", agendamento);

	try {
		const novoAgendamento = criarAgendamento(agendamento);
		res.status(201).json(novoAgendamento);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const atualizarStatusAgendamento = (req: Request, res: Response) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
		const agendamento = alterarStatus(id, status);
		res.status(200).json(agendamento);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const listarTodosAgendamentos = (req: Request, res: Response) => {
	var d = req.query.data;
	var s = req.query.status as string | undefined;
	var m = req.query.motoristaCpf as string | undefined;

	let df: Date | undefined = undefined;
	if (d) df = parseISO(d as string);

	const agendamentos = listarAgendamentos(df, s, m);
	res.status(200).json(agendamentos);
};
export const deletarAgendamentosAntigos = (req: Request, res: Response) => {
	removerAgendamentosAntigos();
	res.status(204).send("Agendamentos com mais de 3 dias foram removidos");
};