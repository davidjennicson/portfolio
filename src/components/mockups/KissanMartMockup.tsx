import React from 'react';
import { motion } from 'motion/react';
import { Shield, Truck, Package, CheckCircle2, MapPin } from 'lucide-react';

const KissanMartMockup = () => {
  const steps = [
    { label: "Harvested", date: "Oct 12, 2023", status: "completed", location: "Farm #42, Punjab" },
    { label: "Processing", date: "Oct 14, 2023", status: "completed", location: "Hub #09, Ludhiana" },
    { label: "In Transit", date: "Oct 15, 2023", status: "active", location: "National Highway" },
    { label: "Retail", date: "Est. Oct 17", status: "pending", location: "FreshMart, Delhi" },
  ];

  return (
    <div className="w-full h-full bg-[#050505] p-6 font-sans text-white/90 overflow-hidden flex flex-col gap-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-green-500" />
          </div>
          <span className="font-bold tracking-tight">KissanMart <span className="text-white/40 font-normal">v2.1</span></span>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
          <Shield className="w-3 h-3 text-green-500" />
          <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">Blockchain Verified</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold">Product Info</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Batch ID</span>
              <span className="font-mono text-green-400">#KM-88291</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Product</span>
              <span>Organic Basmati Rice</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Quantity</span>
              <span>500 kg</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col justify-center items-center gap-2">
          <div className="w-12 h-12 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
          <span className="text-[10px] uppercase tracking-widest text-white/40">Syncing Ledger...</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/5 flex-1 relative overflow-hidden">
        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-8">Supply Chain Journey</h4>
        
        <div className="space-y-8 relative z-10">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex gap-4 relative"
            >
              {/* Connector line */}
              {i !== steps.length - 1 && (
                <div className="absolute left-3 top-6 w-[2px] h-10 bg-white/10" />
              )}
              
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                step.status === 'completed' ? 'bg-green-500' : 
                step.status === 'active' ? 'bg-green-500/20 border border-green-500 animate-pulse' : 
                'bg-white/10'
              }`}>
                {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-black" />}
                {step.status === 'active' && <Truck className="w-3 h-3 text-green-500" />}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-bold ${step.status === 'pending' ? 'text-white/20' : 'text-white'}`}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-white/20 font-mono">{step.date}</span>
                </div>
                <div className="flex items-center gap-1 text-white/30 text-[10px] mt-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {step.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl -mr-16 -mt-16" />
      </div>
    </div>
  );
};

export default KissanMartMockup;
