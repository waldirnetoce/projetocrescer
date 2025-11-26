
import React, { useState } from 'react';
import { TabView, SipocRow } from './types';
import { 
  SIPOC_DATA, 
  GROUP_MEMBERS, 
  PARETO_DATA, 
  VOC_DATA, 
  ISHIKAWA_DATA,
  ACTION_PLAN,
  FIVE_WHYS_DATA
} from './constants';
import SipocTable from './components/SipocTable';
import DashboardMetric from './components/DashboardMetric';
import ProcessFlowVisual from './components/ProcessFlowVisual';
import ParetoChart from './components/ParetoChart';
import IshikawaDiagram from './components/IshikawaDiagram';
import FiveWTwoH from './components/FiveWTwoH';

import { 
  LayoutGrid, 
  FileSpreadsheet, 
  PieChart, 
  GitBranch, 
  Users, 
  Activity, 
  Layers,
  ChevronRight,
  BookOpen,
  Briefcase,
  Database,
  CheckSquare,
  Network,
  HelpCircle,
  FileText,
  ShieldCheck,
  Menu,
  X,
  Edit2,
  Save
} from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<TabView>(TabView.DASHBOARD);
  const [sipocData, setSipocData] = useState<SipocRow[]>(SIPOC_DATA);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState<string[]>(GROUP_MEMBERS);
  const [isEditingMembers, setIsEditingMembers] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...groupMembers];
    newMembers[index] = value;
    setGroupMembers(newMembers);
  };

  // Helper for Sidebar Items
  const NavItem = ({ view, icon: Icon, label }: { view: TabView, icon: any, label: string }) => (
    <button 
      onClick={() => {
        setActiveView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm mb-1 ${activeView === view ? 'bg-white/10 text-yellow-400 font-medium' : 'text-slate-300 hover:bg-white/5'}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-72 bg-[#2e1a47] text-white flex flex-col flex-shrink-0 transition-transform duration-300 shadow-xl z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center text-[#2e1a47] font-bold shadow-lg shadow-yellow-400/20">
               PC
             </div>
             <div>
               <h1 className="font-bold text-lg leading-tight">Projeto Crescer</h1>
               <p className="text-xs text-slate-300 opacity-80">DMAIC Dashboard</p>
             </div>
          </div>
          <button onClick={toggleMobileMenu} className="md:hidden text-slate-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          <div className="mb-4">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Visão Geral</p>
            <NavItem view={TabView.DASHBOARD} icon={LayoutGrid} label="Dashboard Executivo" />
            <NavItem view={TabView.PRESENTATION} icon={BookOpen} label="Apresentação Inicial" />
            <NavItem view={TabView.CASE} icon={Briefcase} label="Case do Projeto" />
            <NavItem view={TabView.DATA} icon={Database} label="Dados Brutos" />
          </div>

          <div className="mb-4">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Definir (Define)</p>
            <NavItem view={TabView.SIPOC} icon={Layers} label="SIPOC" />
            <NavItem view={TabView.VOC} icon={Users} label="Voice of Customer" />
            <NavItem view={TabView.CTQ} icon={Activity} label="Árvore CTQ" />
          </div>

          <div className="mb-4">
             <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Medir (Measure)</p>
             <NavItem view={TabView.FLOWCHART} icon={GitBranch} label="Fluxograma" />
             <NavItem view={TabView.PARETO} icon={PieChart} label="Gráfico de Pareto" />
          </div>

          <div className="mb-4">
             <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Analisar (Analyze)</p>
             <NavItem view={TabView.ISHIKAWA} icon={Network} label="Ishikawa (Espinha de Peixe)" />
             <NavItem view={TabView.FIVE_WHYS} icon={HelpCircle} label="5 Porquês" />
          </div>

          <div className="mb-4">
             <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Melhorar (Improve)</p>
             <NavItem view={TabView.FIVE_W_TWO_H} icon={CheckSquare} label="5W2H (Plano de Ação)" />
          </div>

          <div className="mb-4">
             <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Controlar (Control)</p>
             <NavItem view={TabView.CONCLUSION} icon={FileText} label="Conclusão" />
             <NavItem view={TabView.EVIDENCE} icon={ShieldCheck} label="Evidências" />
          </div>
        </nav>

        <div className="p-4 bg-[#25153a] border-t border-white/5">
          <div className="flex items-center justify-between mb-3">
             <p className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-2">
               <Users className="w-3 h-3" /> Grupo 4
             </p>
             <button 
               onClick={() => setIsEditingMembers(!isEditingMembers)}
               className="text-slate-400 hover:text-white transition-colors"
               title={isEditingMembers ? "Salvar" : "Editar Grupo"}
             >
               {isEditingMembers ? <Save className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
             </button>
          </div>
          <ul className="space-y-1 text-xs text-slate-300">
            {groupMembers.map((member, idx) => (
              <li key={idx} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0"></div>
                {isEditingMembers ? (
                  <input 
                    type="text" 
                    value={member} 
                    onChange={(e) => handleMemberChange(idx, e.target.value)}
                    className="bg-white/10 border-none rounded px-1 py-0.5 text-xs text-white w-full focus:ring-1 focus:ring-yellow-400 outline-none"
                  />
                ) : (
                  <span>{member}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-slate-50">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={toggleMobileMenu} className="text-slate-600 hover:text-[#2e1a47]">
              <Menu className="w-6 h-6" />
            </button>
            <div className="font-bold text-[#2e1a47]">Projeto Crescer</div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm">
             <span className="font-semibold text-slate-700">Módulo Ativo:</span>
             <span className="bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">
               {activeView.replace(/_/g, ' ')}
             </span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-slate-800">Líderes em Formação</p>
               <p className="text-xs text-slate-500">Out/2023</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2e1a47] to-[#4c2b73] flex items-center justify-center text-white font-bold shadow-md ring-2 ring-yellow-400/50">
               G4
             </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">

            {/* --- DASHBOARD VIEW --- */}
            {activeView === TabView.DASHBOARD && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <DashboardMetric title="Satisfação (NPS)" value="+45" icon={Activity} trend="Subindo" color="bg-emerald-500" />
                  <DashboardMetric title="Defeitos" value="145" icon={PieChart} trend="Principal Causa" color="bg-red-500" />
                  <DashboardMetric title="Ações" value="3" icon={CheckSquare} trend="Em andamento" color="bg-blue-500" />
                  <DashboardMetric title="Etapas Processo" value={sipocData.length} icon={Layers} color="bg-purple-500" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-indigo-600" />
                        Pareto: Principais Ofensores
                      </h3>
                      <ParetoChart data={PARETO_DATA.slice(0, 5)} />
                   </div>
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        Voz do Cliente (Destaques)
                      </h3>
                      <div className="space-y-4">
                        {VOC_DATA.slice(0, 3).map(voc => (
                          <div key={voc.id} className="bg-slate-50 p-3 rounded-lg border-l-4 border-yellow-400">
                             <p className="italic text-slate-600 text-sm">"{voc.customerVoice}"</p>
                             <div className="mt-2 flex items-center gap-2">
                               <span className="text-[10px] font-bold uppercase bg-slate-200 px-2 py-0.5 rounded text-slate-600">Necessidade:</span>
                               <span className="text-xs font-semibold text-slate-800">{voc.criticalNeed}</span>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
                   <h3 className="font-bold text-slate-800 mb-4">Fluxo Macro (SIPOC)</h3>
                   <ProcessFlowVisual data={sipocData} />
                </div>
              </>
            )}

            {/* --- PRESENTATION / CASE VIEW --- */}
            {(activeView === TabView.PRESENTATION || activeView === TabView.CASE) && (
               <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 min-h-[500px] flex flex-col items-center justify-center text-center">
                  <Briefcase className="w-20 h-20 text-indigo-200 mb-6" />
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">
                    {activeView === TabView.PRESENTATION ? 'Apresentação Inicial' : 'Case do Projeto'}
                  </h2>
                  <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
                    Nesta seção, descrevemos o cenário inicial do projeto, o problema de negócio enfrentado pela empresa e o escopo definido para o grupo de trabalho. O foco é a otimização do atendimento ao cliente e redução do tempo de espera.
                  </p>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl text-left">
                     <div className="p-4 bg-slate-50 rounded border border-slate-100">
                        <h4 className="font-bold text-slate-700 mb-2">Problema</h4>
                        <p className="text-sm text-slate-600">Alta taxa de abandono e reclamações sobre demora.</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded border border-slate-100">
                        <h4 className="font-bold text-slate-700 mb-2">Meta</h4>
                        <p className="text-sm text-slate-600">Reduzir tempo de espera em 30% até o fim do trimestre.</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded border border-slate-100">
                        <h4 className="font-bold text-slate-700 mb-2">Impacto</h4>
                        <p className="text-sm text-slate-600">Melhoria no NPS e redução de custos operacionais.</p>
                     </div>
                  </div>
               </div>
            )}

            {/* --- DATA VIEW --- */}
            {activeView === TabView.DATA && (
               <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Base de Dados</h2>
                      <p className="text-slate-500 text-sm mt-1">Dados brutos consolidados do projeto.</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 flex items-center">
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Importar Planilha
                    </button>
                  </div>
                  
                  {/* Raw Data Table Preview */}
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-sm text-left text-slate-600">
                      <thead className="text-xs uppercase bg-slate-100 text-slate-700">
                        <tr>
                          <th className="px-4 py-3 border-b">ID</th>
                          <th className="px-4 py-3 border-b">Fornecedor</th>
                          <th className="px-4 py-3 border-b">Entrada</th>
                          <th className="px-4 py-3 border-b">Processo</th>
                          <th className="px-4 py-3 border-b">Saída</th>
                          <th className="px-4 py-3 border-b">Cliente</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sipocData.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50">
                            <td className="px-4 py-2 font-mono text-xs">{row.id}</td>
                            <td className="px-4 py-2">{row.supplier}</td>
                            <td className="px-4 py-2">{row.input}</td>
                            <td className="px-4 py-2">{row.process}</td>
                            <td className="px-4 py-2">{row.output}</td>
                            <td className="px-4 py-2">{row.customer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-3 bg-slate-50 text-xs text-center text-slate-500 border-t">
                      Exibindo {sipocData.length} registros. A base completa inclui histórico de 6 meses (simulado).
                    </div>
                  </div>
               </div>
            )}

            {/* --- SIPOC VIEW --- */}
            {activeView === TabView.SIPOC && (
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">SIPOC</h2>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">Definir</span>
                  </div>
                  <SipocTable data={sipocData} readOnly />
               </div>
            )}

            {/* --- VOC VIEW --- */}
            {activeView === TabView.VOC && (
              <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-slate-800">Voice of Customer (VOC)</h2>
                 <div className="grid gap-4">
                    {VOC_DATA.map(item => (
                      <div key={item.id} className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                               <p className="text-xs font-bold text-indigo-500 uppercase mb-1">Voz do Cliente</p>
                               <p className="text-lg italic text-slate-700">"{item.customerVoice}"</p>
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4">
                               <div>
                                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Questão Chave</p>
                                  <p className="font-semibold text-slate-800">{item.keyIssue}</p>
                                </div>
                               <div>
                                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Necessidade</p>
                                  <p className="font-semibold text-slate-800">{item.criticalNeed}</p>
                               </div>
                            </div>
                            <div className="flex-1 bg-slate-50 p-3 rounded border border-slate-200">
                               <p className="text-xs font-bold text-slate-500 uppercase mb-1">CTQ (Crítico para Qualidade)</p>
                               <p className="font-bold text-indigo-700">{item.ctq}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

             {/* --- CTQ VIEW --- */}
             {activeView === TabView.CTQ && (
               <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 min-h-[600px]">
                 <h2 className="text-2xl font-bold text-slate-800 mb-8">Árvore CTQ (Critical to Quality)</h2>
                 <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                       {/* Level 1: Need */}
                       <div className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold text-lg mb-8 shadow-lg z-10">
                          Necessidade: Atendimento Ágil
                       </div>
                       
                       {/* Connector */}
                       <div className="w-0.5 h-8 bg-slate-300 -mt-8 mb-8"></div>
                       <div className="w-[60%] h-0.5 bg-slate-300 mb-8 relative">
                          <div className="absolute left-0 top-0 w-0.5 h-8 bg-slate-300"></div>
                          <div className="absolute right-0 top-0 w-0.5 h-8 bg-slate-300"></div>
                          <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-slate-300"></div>
                       </div>

                       {/* Level 2: Drivers */}
                       <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl gap-4">
                          <div className="flex flex-col items-center w-full md:w-1/3">
                             <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded font-semibold border border-indigo-200 mb-4 text-center">
                                Tempo de Espera
                             </div>
                             <div className="w-0.5 h-6 bg-slate-300 mb-2"></div>
                             <div className="bg-green-50 text-green-800 px-3 py-2 rounded text-sm font-bold border border-green-200 text-center w-full">
                                Menor que 30s
                             </div>
                          </div>
                          <div className="flex flex-col items-center w-full md:w-1/3">
                             <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded font-semibold border border-indigo-200 mb-4 text-center">
                                Disponibilidade
                             </div>
                             <div className="w-0.5 h-6 bg-slate-300 mb-2"></div>
                             <div className="bg-green-50 text-green-800 px-3 py-2 rounded text-sm font-bold border border-green-200 text-center w-full">
                                Uptime {'>'} 99.9%
                             </div>
                          </div>
                          <div className="flex flex-col items-center w-full md:w-1/3">
                             <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded font-semibold border border-indigo-200 mb-4 text-center">
                                Precisão
                             </div>
                             <div className="w-0.5 h-6 bg-slate-300 mb-2"></div>
                             <div className="bg-green-50 text-green-800 px-3 py-2 rounded text-sm font-bold border border-green-200 text-center w-full">
                                Erros de Cadastro &lt; 1%
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            )}

            {/* --- FLOWCHART VIEW --- */}
            {activeView === TabView.FLOWCHART && (
               <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-slate-800">Fluxograma do Processo</h2>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                    <div className="flex items-center gap-4 min-w-max">
                        <div className="w-32 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold bg-slate-100">INÍCIO</div>
                        <ChevronRight className="w-6 h-6 text-slate-400" />
                        <div className="w-40 h-16 rounded border-2 border-slate-600 flex items-center justify-center text-center text-sm p-2 bg-white shadow-sm">Cliente Liga</div>
                        <ChevronRight className="w-6 h-6 text-slate-400" />
                        <div className="w-40 h-16 rounded border-2 border-slate-600 flex items-center justify-center text-center text-sm p-2 bg-white shadow-sm">URA Atende</div>
                        <ChevronRight className="w-6 h-6 text-slate-400" />
                         <div className="w-32 h-32 transform rotate-45 border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-center text-xs p-8 shadow-sm">
                            <span className="transform -rotate-45">Opção Válida?</span>
                         </div>
                         <div className="flex flex-col items-center h-full justify-between -ml-4 gap-2">
                            <span className="text-xs font-bold text-green-600">Sim</span>
                            <ChevronRight className="w-6 h-6 text-green-500" />
                         </div>
                         <div className="w-40 h-16 rounded border-2 border-slate-600 flex items-center justify-center text-center text-sm p-2 bg-white shadow-sm">Transfere Fila</div>
                         <ChevronRight className="w-6 h-6 text-slate-400" />
                         <div className="w-32 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold bg-slate-100">FIM</div>
                    </div>
                    <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600">
                        * Representação simplificada do fluxo atual. O mapa detalhado encontra-se no anexo técnico.
                    </div>
                 </div>
               </div>
            )}

            {/* --- PARETO VIEW --- */}
            {activeView === TabView.PARETO && (
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">Gráfico de Pareto (80/20)</h2>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold">Medir</span>
                  </div>
                  <ParetoChart data={PARETO_DATA} />
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-yellow-800 text-sm">
                     <strong>Conclusão da Análise:</strong> Focando apenas em "Tempo de Espera" e "Queda de Ligação", resolvemos aproximadamente 75% dos problemas reportados pelos clientes.
                  </div>
               </div>
            )}

            {/* --- ISHIKAWA VIEW --- */}
            {activeView === TabView.ISHIKAWA && (
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">Diagrama de Ishikawa (Causa e Efeito)</h2>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">Analisar</span>
                  </div>
                  <IshikawaDiagram data={ISHIKAWA_DATA} effect="Tempo de Espera Elevado" />
               </div>
            )}

            {/* --- 5 WHYS VIEW --- */}
             {activeView === TabView.FIVE_WHYS && (
               <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800">5 Porquês (Causa Raiz)</h2>
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-3xl mx-auto">
                     <div className="space-y-0">
                        {FIVE_WHYS_DATA.map((item, idx) => (
                           <div key={idx} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 
                                    ${item.root ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-indigo-100 text-indigo-700'}`}>
                                    {idx + 1}
                                 </div>
                                 {idx < FIVE_WHYS_DATA.length - 1 && (
                                    <div className="w-0.5 h-16 bg-slate-200"></div>
                                 )}
                              </div>
                              <div className={`pb-8 ${item.root ? 'opacity-100' : 'opacity-80'}`}>
                                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">{item.level}</p>
                                 <p className={`text-lg ${item.root ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                                    {item.answer}
                                 </p>
                                 {item.root && (
                                    <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">Causa Raiz Identificada</span>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* --- 5W2H VIEW --- */}
            {activeView === TabView.FIVE_W_TWO_H && (
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">Plano de Ação (5W2H)</h2>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">Melhorar</span>
                  </div>
                  <FiveWTwoH data={ACTION_PLAN} />
               </div>
            )}

            {/* --- CONCLUSION / EVIDENCE VIEW --- */}
            {(activeView === TabView.CONCLUSION || activeView === TabView.EVIDENCE) && (
               <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 min-h-[500px]">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">
                     {activeView === TabView.CONCLUSION ? 'Conclusão e Próximos Passos' : 'Evidências e Anexos'}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                     {activeView === TabView.CONCLUSION ? (
                        <>
                           <p className="text-lg text-slate-600">
                              O projeto demonstrou que a causa raiz do alto tempo de espera não era a quantidade de atendentes, mas sim a infraestrutura tecnológica obsoleta que causava lentidão no sistema durante o atendimento.
                           </p>
                           <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-700">
                              <li>A implementação do plano de ação 5W2H deve reduzir o TMA em 25% nas primeiras 4 semanas.</li>
                              <li>O investimento em treinamento terá retorno (ROI) estimado em 3 meses.</li>
                              <li>Sugerimos a abertura de um novo ciclo PDCA para monitorar a qualidade após as mudanças de infraestrutura.</li>
                           </ul>
                        </>
                     ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                           {[1,2,3,4].map(i => (
                              <div key={i} className="aspect-square bg-slate-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-indigo-400 cursor-pointer transition-colors group">
                                 <FileText className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 mb-2" />
                                 <span className="text-sm font-medium text-slate-500 group-hover:text-indigo-600">Evidência {i}.pdf</span>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
