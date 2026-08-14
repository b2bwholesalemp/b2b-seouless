import React, { useState } from 'react';
import { Cpu, Sparkles, Zap, Play, CheckCircle2, RefreshCw, Shield, Bot } from 'lucide-react';
import { AgentTask } from '../../types';

interface AgentsHubProps {
  tasks: AgentTask[];
  onAddTask: (task: AgentTask) => void;
}

export const AgentsHub: React.FC<AgentsHubProps> = ({ tasks, onAddTask }) => {
  const [runningId, setRunningId] = useState<string | null>(null);
  const [newWorkflowName, setNewWorkflowName] = useState('');

  const handleRunWorkflow = (taskId: string) => {
    setRunningId(taskId);
    setTimeout(() => {
      setRunningId(null);
    }, 2500);
  };

  const handleCreateCustomAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkflowName) return;
    const newTask: AgentTask = {
      id: `task_${Date.now()}`,
      title: newWorkflowName,
      status: 'running',
      output: 'Initializing Gemini 2.5 Pro autonomous routines...'
    };
    onAddTask(newTask);
    setNewWorkflowName('');
    setTimeout(() => {
      newTask.status = 'success';
      newTask.output = 'Workflow compiled & executed successfully across nodes.';
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Immersive Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#262626] via-[#1c1c1c] to-[#171717] border border-[#2F2F2F] p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#9E7FFF]/20 via-[#38bdf8]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E7FFF]/10 border border-[#9E7FFF]/30 text-[#9E7FFF] text-xs font-bold mb-6">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>Autonomous Multi-Agent AI Core</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Agentic OS & <span className="bg-gradient-to-r from-[#9E7FFF] via-[#38bdf8] to-white bg-clip-text text-transparent">Automation Hub</span>
          </h1>
          <p className="text-[#A3A3A3] text-base mb-8 leading-relaxed">
            Deploy autonomous agents to synchronize inventory, forecast seasonal re-orders, optimize wholesale pricing tiers, and generate custom PDF line sheets in seconds.
          </p>

          <form onSubmit={handleCreateCustomAgent} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Describe custom agent task (e.g. Sync Shopify inventory with NuORDER...)"
              value={newWorkflowName}
              onChange={(e) => setNewWorkflowName(e.target.value)}
              className="flex-1 bg-[#1f1f1f] border border-[#2F2F2F] rounded-2xl px-5 py-4 text-sm text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#9E7FFF]"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#805ad5] text-white font-bold text-sm shadow-lg shadow-[#9E7FFF]/30 hover:shadow-[#9E7FFF]/50 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Deploy Agent</span>
            </button>
          </form>
        </div>
      </div>

      {/* Agent Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-3xl bg-[#262626]/70 backdrop-blur-xl border border-[#2F2F2F] p-8 flex flex-col justify-between hover:border-[#9E7FFF]/40 transition-all shadow-xl group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9E7FFF]/20 to-[#38bdf8]/20 border border-[#9E7FFF]/30 flex items-center justify-center text-[#9E7FFF]">
                  <Cpu className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </div>
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase ${
                  task.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                  task.status === 'running' || runningId === task.id ? 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30 animate-pulse' :
                  'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {runningId === task.id ? 'running' : task.status}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white">{task.title}</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed bg-[#1f1f1f] p-4 rounded-2xl border border-[#2F2F2F]">
                {runningId === task.id ? 'Executing deep neural analysis across enterprise APIs...' : task.output || 'Agent standing by for deployment.'}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleRunWorkflow(task.id)}
                disabled={runningId === task.id}
                className="w-full py-3.5 rounded-2xl bg-[#1f1f1f] hover:bg-[#333] border border-[#2F2F2F] text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
              >
                <Play className={`w-4 h-4 text-[#9E7FFF] ${runningId === task.id ? 'animate-spin' : ''}`} />
                <span>{runningId === task.id ? 'Processing...' : 'Run Agent Now'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
