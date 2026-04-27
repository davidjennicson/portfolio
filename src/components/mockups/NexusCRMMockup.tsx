import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, List, Plus, TrendingUp, DollarSign, Briefcase, ChevronRight } from 'lucide-react';

const NexusCRMMockup = () => {
  return (
    <div className="w-full h-full bg-[#0F172A] p-6 font-sans text-slate-300 overflow-hidden flex flex-col gap-6 select-none">
      {/* Navbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <span className="text-white font-bold tracking-tight">Nexus <span className="text-indigo-400">CRM</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <div className="bg-slate-700 px-2 py-1 rounded-md"><LayoutGrid className="w-4 h-4 text-white" /></div>
            <div className="px-2 py-1"><List className="w-4 h-4 text-slate-500" /></div>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors">
            <Plus className="w-3 h-3" /> New Deal
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-slate-500">
            <DollarSign className="w-3 h-3" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Revenue</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h4 className="text-xl font-bold text-white">$124,500</h4>
            <span className="text-emerald-500 text-[10px] font-bold flex items-center"><TrendingUp className="w-2 h-2 mr-1" /> +12%</span>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Briefcase className="w-3 h-3" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Deals</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h4 className="text-xl font-bold text-white">42</h4>
            <span className="text-indigo-400 text-[10px] font-bold tracking-widest uppercase">Pipeline</span>
          </div>
        </div>
      </div>

      {/* Kanban Board Mockup */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {[
          { title: "Qualified", count: 12, color: "bg-blue-500/20 text-blue-400", items: ["Enterprise Deal A", "Global Logistics"] },
          { title: "Proposal", count: 5, color: "bg-indigo-500/20 text-indigo-400", items: ["Tech Solutions", "Retail Chain"] },
          { title: "Negotiation", count: 3, color: "bg-amber-500/20 text-amber-400", items: ["System Upgrade"] },
        ].map((column, i) => (
          <div key={i} className="flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{column.title}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${column.color}`}>{column.count}</span>
            </div>
            <div className="flex-1 space-y-3">
              {column.items.map((item, j) => (
                <div key={j} className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-sm space-y-3 group cursor-pointer hover:border-slate-600 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white leading-tight">{item}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${column.title === 'Negotiation' ? 'w-[85%] bg-amber-500' : column.title === 'Proposal' ? 'w-[60%] bg-indigo-500' : 'w-[30%] bg-blue-500'}`} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="border border-dashed border-slate-700 rounded-lg p-3 flex items-center justify-center text-slate-600 text-[10px] font-bold">
                + Drop here
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NexusCRMMockup;
