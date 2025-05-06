import { Agendamento, Status } from '../models/agendamento';
import { differenceInDays, isSameDay, subHours } from "date-fns";

var agendamentos: Agendamento[] = [];

export const criarAgendamento = (novoAgendamento: Agendamento): Agendamento => {
	const agendamentoNaUltimaHora = checaAgendamentoNaUltimaHora(novoAgendamento);
	const motoristaPedenteOuAtrasado = checaMotoristaPedenteOuAtrasado(novoAgendamento.motoristaCpf);

	if (agendamentoNaUltimaHora || motoristaPedenteOuAtrasado) {
		throw new Error("Conflito de agendamento");
	}

	novoAgendamento.status = "pendente";
	agendamentos.push(novoAgendamento);

	return novoAgendamento
};

export const alterarStatus = (id: string, novoStatus: Status): Agendamento => {
	// TODO
};

export const listarAgendamentos = (d: Date | undefined, s: string | undefined, m: string | undefined): Agendamento[] => {
	return agendamentos.filter((a) => {
		var corresponde = true;

		if (d) {
			corresponde = corresponde && isSameDay(a.dataHora, d);
		} else if (s) {
			corresponde = corresponde && a.status === s;
		} else if (m) {
			corresponde = corresponde && a.motoristaCpf === m;
		}

		return corresponde;
	});
};

export const removerAgendamentosAntigos = (): void => {
	var temp: Agendamento[] = [];

	agendamentos.map((a) => {
		const diasDeDiferenca = differenceInDays(new Date(), a.dataHora);

		if (diasDeDiferenca <= 3) {
			for (let i = 0; i < agendamentos.length; i++) {
				const e = agendamentos[i];

				if (e.id === a.id) {
					temp[i] = e;
				}
			}
		}
	});

	agendamentos = temp;
};


const checaAgendamentoNaUltimaHora = (agendamento: Agendamento): boolean => {
	const lastHourDate = new Date(subHours(new Date(agendamento.dataHora), 1));

	try {
		const NumeroAgendamentosNaUltimaHora = agendamentos.filter((agendamento) => isSameDay(agendamento.dataHora, lastHourDate)).length;

		return NumeroAgendamentosNaUltimaHora > 0;
	} catch (error) {
		console.error(error)
		throw error
	}
}

const checaMotoristaPedenteOuAtrasado = (cpf: string): boolean => {
	try {
		const agendamentosFiltrados = agendamentos.filter((agendamento) => ["pendente", "atrasado"].includes(agendamento.status));

		return agendamentosFiltrados.length > 0;
	} catch (error) {
		console.error(error)
		throw error
	}
}

