
import { SipocRow, FeedbackItem, ParetoData, VocItem, IshikawaCategory, ActionPlanItem } from './types';

export const GROUP_MEMBERS = [
  "Participante 1",
  "Participante 2",
  "Participante 3",
  "Participante 4",
  "Participante 5"
];

// --- SIPOC DATA ---
export const SIPOC_DATA: SipocRow[] = [
  { id: 1, supplier: "Clientes", input: "Ligação", process: "Receber ligações", output: "Atendimento iniciado", customer: "Cliente" },
  { id: 2, supplier: "Sistema", input: "Dados do Cliente", process: "Consultar Cadastro", output: "Dados Validados", customer: "Atendente" },
  { id: 3, supplier: "Suporte", input: "Base de Conhecimento", process: "Identificar Problema", output: "Diagnóstico", customer: "Atendente" },
  { id: 4, supplier: "Atendente", input: "Diagnóstico", process: "Realizar Procedimento", output: "Problema Resolvido", customer: "Cliente" },
  { id: 5, supplier: "Sistema", input: "Log de Atendimento", process: "Registrar no CRM", output: "Protocolo Gerado", customer: "Gestão" },
];

export const FEEDBACK_ITEMS: FeedbackItem[] = [
  { id: 1, type: 'strength', title: "Mapeamento Completo", description: "O fluxo cobre desde a entrada do cliente até o registro final." },
  { id: 2, type: 'improvement', title: "Especificidade", description: "Alguns inputs do sistema poderiam ser mais detalhados." }
];

// --- PARETO DATA ---
export const PARETO_DATA: ParetoData[] = [
  { label: "Tempo de Espera Elevado", count: 145 },
  { label: "Queda de Ligação", count: 80 },
  { label: "Informação Incorreta", count: 45 },
  { label: "Atendente Rude", count: 20 },
  { label: "Sistema Lento", count: 15 },
  { label: "Outros", count: 10 },
];

// --- VOC DATA ---
export const VOC_DATA: VocItem[] = [
  { id: 1, customerVoice: "Fico muito tempo ouvindo música antes de alguém atender.", keyIssue: "Demora no atendimento", criticalNeed: "Agilidade", ctq: "Tempo de Espera < 30s" },
  { id: 2, customerVoice: "O atendente não sabia resolver meu problema.", keyIssue: "Falta de conhecimento", criticalNeed: "Capacitação", ctq: "Resolução no 1º contato > 90%" },
  { id: 3, customerVoice: "A ligação caiu e ninguém retornou.", keyIssue: "Instabilidade / Processo falho", criticalNeed: "Continuidade", ctq: "Taxa de retorno em quedas = 100%" },
];

// --- ISHIKAWA DATA ---
export const ISHIKAWA_DATA: IshikawaCategory[] = [
  { category: "Mão de Obra", causes: ["Falta de Treinamento", "Alta Rotatividade", "Fadiga"] },
  { category: "Método", causes: ["Script desatualizado", "Processo burocrático", "Falta de autonomia"] },
  { category: "Máquina", causes: ["Headset com ruído", "Computadores lentos", "Sistema trava"] },
  { category: "Material", causes: ["Base de conhecimento incompleta", "Falta de acesso a ferramentas"] },
  { category: "Medida", causes: ["Metas conflitantes (TMA vs Qualidade)", "Monitoria insuficiente"] },
  { category: "Meio Ambiente", causes: ["Ruído no call center", "Iluminação inadequada"] },
];

// --- 5W2H DATA ---
export const ACTION_PLAN: ActionPlanItem[] = [
  { id: 1, what: "Atualizar Base de Conhecimento", why: "Reduzir tempo de consulta", where: "Sistema Intranet", when: "Até 15/10", who: "Equipe de Treinamento", how: "Revisão dos top 10 motivos de contato", howMuch: "R$ 0,00 (Interno)", status: "Em Andamento" },
  { id: 2, what: "Treinamento de Empatia", why: "Melhorar nota de satisfação", where: "Sala de Treinamento", when: "20/10 a 25/10", who: "RH / Qualidade", how: "Workshop presencial", howMuch: "R$ 500,00", status: "Pendente" },
  { id: 3, what: "Otimizar Script da URA", why: "Reduzir transbordos desnecessários", where: "Sistema Telefonia", when: "Concluído", who: "TI / Telecom", how: "Refatoração da árvore de decisão", howMuch: "R$ 0,00", status: "Concluído" },
];

// --- 5 WHYS ---
export const FIVE_WHYS_DATA = [
  { level: "1. Por que?", answer: "O tempo médio de atendimento (TMA) está alto.", root: false },
  { level: "2. Por que?", answer: "Os atendentes demoram para encontrar as informações.", root: false },
  { level: "3. Por que?", answer: "O sistema trava ou é lento durante a busca.", root: false },
  { level: "4. Por que?", answer: "O banco de dados está sobrecarregado no horário de pico.", root: false },
  { level: "5. Por que?", answer: "A infraestrutura do servidor não foi escalada para o novo volume de clientes.", root: true },
];
