import React from 'react';
import { motion } from 'motion/react';
import { Activity, Users, Calendar, Pill, Search, Bell, User } from 'lucide-react';

const SwasthyaMockup = () => {
  return (
    <div className="w-full h-full bg-[#f8fafc] p-6 font-sans text-slate-800 overflow-hidden flex flex-col gap-6 select-none">
      {/* Sidebar & Header wrapper */}
      <div className="flex gap-6 h-full">
        {/* Sidebar Mini */}
        <div className="w-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center py-6 gap-8">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Activity className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-6 text-slate-400">
            <Users className="w-5 h-5" />
            <Calendar className="w-5 h-5" />
            <Pill className="w-5 h-5" />
            <Bell className="w-5 h-5" />
          </div>
          <div className="mt-auto">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Hospital Dashboard</h3>
              <p className="text-xs text-slate-400">Welcome back, Dr. Jennicson</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400">Search patient...</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Active Patients", value: "142", color: "bg-blue-500", icon: Users },
              { label: "Appointments", value: "28", color: "bg-emerald-500", icon: Calendar },
              { label: "Critical Care", value: "05", color: "bg-rose-500", icon: Activity },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* EHR Table Mockup */}
          <div className="bg-white flex-1 rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Recent Admissions</h4>
              <span className="text-[10px] text-blue-600 font-bold">View all →</span>
            </div>
            <div className="p-4 space-y-4">
              {[
                { name: "Arjun Sharma", id: "P-1002", status: "Stable", time: "10m ago" },
                { name: "Priya Varma", id: "P-1004", status: "Observation", time: "25m ago" },
                { name: "Rohan Das", id: "P-1005", status: "Critical", time: "1h ago" },
              ].map((patient, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{patient.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{patient.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      patient.status === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                      patient.status === 'Stable' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {patient.status}
                    </span>
                    <span className="text-[9px] text-slate-300 uppercase">{patient.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwasthyaMockup;
