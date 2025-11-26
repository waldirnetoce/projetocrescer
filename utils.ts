import { SipocRow, FeedbackItem } from './types';

// Helper to parse tab-separated values (Excel/Google Sheets copy-paste)
export const parseSipocData = (text: string): SipocRow[] => {
  const rows = text.trim().split('\n');
  return rows.map((row, index) => {
    const cols = row.split('\t');
    // Handle cases where copy-paste might miss columns
    return {
      id: Date.now() + index,
      supplier: cols[0]?.trim() || '',
      input: cols[1]?.trim() || '',
      process: cols[2]?.trim() || '',
      output: cols[3]?.trim() || '',
      customer: cols[4]?.trim() || ''
    };
  });
};

// Heuristics for Portuguese SIPOC analysis
export const analyzeSipocData = (data: SipocRow[]): FeedbackItem[] => {
  const feedback: FeedbackItem[] = [];
  let idCounter = 1000;

  data.forEach((row, index) => {
    const rowNum = index + 1;

    // 1. Check for Actions (Verbs) in Process
    // Portuguese verbs usually end in -ar, -er, -ir. 
    // We check the first word.
    const firstProcessWord = row.process.split(' ')[0]?.toLowerCase() || '';
    const isVerb = firstProcessWord.endsWith('ar') || firstProcessWord.endsWith('er') || firstProcessWord.endsWith('ir');
    
    // Specific check for nouns masquerading as processes
    if (!isVerb && row.process.length > 3) {
      feedback.push({
        id: idCounter++,
        type: 'improvement',
        title: `Linha ${rowNum}: Processo sem verbo de ação?`,
        description: `O item "${row.process}" parece descrever um substantivo ou estado. Tente iniciar com um verbo no infinitivo (ex: Receber, Analisar, Enviar).`
      });
    }

    // 2. Vague Inputs
    if (row.input.length > 0 && row.input.length < 4) {
      feedback.push({
        id: idCounter++,
        type: 'improvement',
        title: `Linha ${rowNum}: Input muito vago`,
        description: `A entrada "${row.input}" é muito curta. Tente ser mais específico (ex: use "Relatório de Vendas" em vez de "Dados").`
      });
    }

    // 3. Circular dependency warning (Supplier == Customer)
    if (row.supplier.toLowerCase() === row.customer.toLowerCase() && row.supplier.length > 0) {
      feedback.push({
        id: idCounter++,
        type: 'info',
        title: `Linha ${rowNum}: Fluxo Circular`,
        description: `O fornecedor e o cliente são a mesma entidade ("${row.supplier}"). Verifique se isso está correto ou se há um intermediário faltando.`
      });
    }

    // 4. Missing Data
    if (!row.supplier || !row.input || !row.process || !row.output || !row.customer) {
       feedback.push({
        id: idCounter++,
        type: 'improvement',
        title: `Linha ${rowNum}: Dados Incompletos`,
        description: `Existem colunas em branco nesta linha. Um SIPOC completo precisa de todos os 5 elementos.`
      });
    }
  });

  return feedback;
};