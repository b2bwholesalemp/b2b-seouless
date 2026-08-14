import React, { useState } from 'react';
import { Cpu, Sparkles, Play, CheckCircle2, Loader2, ArrowRight, Bot, ShieldAlert } from 'lucide-react';
import { AgentTask } from '../types';

export const AgentWorkflowView: React.FC = () => {
  const [tasks, setTasks] = useState<AgentTask[]>([
    { id: 't_1', title: 'Autonomous Demand Forecasting & Trend Synthesis', status: 'idle' },
    { id: 't_2', title: 'Automated Supplier MOQ & Price Negotiation Agent', status: 'idle' },
    { id: 't_3', title: 'Real-time Inventory Rebalancing across Logistics Hubs', status: 'idle' },
    { id: 't_4', title: 'Stripe Escrow & Smart Contract Autonomous Settlement', status: 'idle' },
  ]);

  const [activeRunningId, setActiveRunningId] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([
    'System initialized. Gemini AI Agent Cluster ready.',
    'Connected to global supply chain mesh networks.',
  ]);

  const runTask = (id: string, title: string) => {
    setActiveRunningId(id);
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'running' } : t));
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] Agent executing: "${title}"...`, ...prev]);

    setTimeout(() => {
      setTasks(tasks.map(t => t.id === id ? { ...t, status: 'success', output: 'Optimized 1,420 SKUs with 99.4% predictive precision.' } : t));
      setActiveRunningId(null);
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] Success: Agent "${title}" completed objective.`, ...prev]);
    }, 2500);
  };

  const runAllTasks = () => {
    tasks.forEach((t, idx) => {
      setTimeout(() => {
        runTask(t.id, t.title);
      }, idx * 3000);
    });
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center space-x-2 text-[#9E7FFF] text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>Autonomous Agentic Workflows</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Gemini & Claude Agent Mesh
          </h2>
        </div>

        <button
          onClick={runAllTasks}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white font-bold text-sm shadow-glow hover:scale-105 transition-all flex items-center space-x-2"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Execute Full Agent Pipeline</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agent Cards */}
        <div className="lg:col-span-2 space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-3xl border transition-all flex items-center justify-between ${
                task.status === 'running'
                  ? 'bg-[#9E7FFF]/10 border-[#9E7FFF] shadow-glow'
                  : task.status === 'success'
                  ? 'bg-[#262626] border-success/40'
                  : 'bg-[#262626] border-[#2F2F2F]'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  task.status === 'success' ? 'bg-success/20 text-success' : 'bg-[#171717] text-[#9E7FFF]'
                }`}>
                  {task.status === 'running' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : task.status === 'success' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Bot className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{task.title}</h3>
                  <p className="text-xs text-[#A3A3A3]">
                    {task.status === 'success' ? task.output : `Status: ${task.status.toUpperCase()}`}
                  </p>
                </div>
              </div>

              <button
                disabled={task.status === 'running'}
                onClick={() => runTask(task.id, task.title)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  task.status === 'running'
                    ? 'bg-[#171717] text-[#A3A3A3] cursor-not-allowed'
                    : 'bg-[#171717] border border-[#2F2F2F] text-white hover:border-[#9E7FFF]'
                }`}
              >
                {task.status === 'running' ? 'Running...' : 'Run Agent'}
              </button>
            </div>
          ))}
        </div>

        {/* Live Terminal Logs */}
        <div className="bg-[#262626] border border-[#2F2F2F] rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#2F2F2F] mb-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                <span>Agent Execution Stream</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-ping" />
            </div>

            <div className="space-y-3 font-mono text-[11px] text-[#A3A3A3] max-h-[380px] overflow-y-auto">
              {logs.map((log, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#171717] border border-[#2F2F2F] text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2F2F2F] text-center">
            <span className="text-[10px] text-[#A3A3A3]">Powered by Gemini 1.5 Pro & Claude 3.5 Sonnet</span>
          </div>
        </div>
      </div>
    </section>
  );
};
