
export interface SipocRow {
  id: number;
  supplier: string;
  input: string;
  process: string;
  output: string;
  customer: string;
}

export interface FeedbackItem {
  id: number;
  type: 'strength' | 'improvement' | 'info';
  title: string;
  description: string;
}

export interface ParetoData {
  label: string;
  count: number;
  cumulativePercentage?: number;
}

export interface VocItem {
  id: number;
  customerVoice: string;
  keyIssue: string;
  criticalNeed: string;
  ctq: string;
}

export interface IshikawaCategory {
  category: string;
  causes: string[];
}

export interface ActionPlanItem {
  id: number;
  what: string;
  why: string;
  where: string;
  when: string;
  who: string;
  how: string;
  howMuch: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluído';
}

export enum TabView {
  DASHBOARD = 'DASHBOARD',
  PRESENTATION = 'PRESENTATION',
  CASE = 'CASE',
  DATA = 'DATA',
  SIPOC = 'SIPOC',
  VOC = 'VOC',
  CTQ = 'CTQ',
  FLOWCHART = 'FLOWCHART',
  PARETO = 'PARETO',
  ISHIKAWA = 'ISHIKAWA',
  FIVE_WHYS = 'FIVE_WHYS',
  FIVE_W_TWO_H = 'FIVE_W_TWO_H',
  CONCLUSION = 'CONCLUSION',
  EVIDENCE = 'EVIDENCE'
}
