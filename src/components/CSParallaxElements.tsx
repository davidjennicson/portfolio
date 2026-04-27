import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- ELEGANT DATA STREAM (Matrix Alternative) ---
const SubtleDataStream = () => {
  const columns = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${(i / 20) * 100}%`,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    content: Array.from({ length: 40 })
      .map(() => (Math.random() > 0.5 ? "1" : "0"))
      .join("\n"),
  }));

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
      }}
    >
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-[-100%] text-white/[0.08] text-[10px] font-mono leading-none text-center w-4 whitespace-pre blur-[1px]"
          style={{ left: col.left }}
          animate={{ y: ["0vh", "200vh"] }}
          transition={{
            duration: col.duration,
            repeat: Infinity,
            delay: col.delay,
            ease: "linear",
          }}
        >
          {col.content}
        </motion.div>
      ))}
    </div>
  );
};

// --- ABSTRACT SCHEDULING ALGORITHM (Context Switch Visualizer) ---
const ThreadScheduler = () => {
  // Simulates an OS scheduler context switching between 3 threads
  const [activeThread, setActiveThread] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThread((prev) => (prev + 1) % 3);
    }, 1500); // Context switch every 1.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-48 opacity-30 mix-blend-screen">
      <div className="text-[8px] tracking-[0.3em] text-white/40 uppercase mb-2">
        Thread Allocation
      </div>
      
      {[0, 1, 2].map((threadIdx) => (
        <div key={threadIdx} className="relative w-full h-[1px] bg-white/10">
          <div className="absolute left-[-20px] top-[-5px] text-[8px] text-white/30">
            T{threadIdx}
          </div>
          {/* Thread Execution Block */}
          <motion.div
            className="absolute top-[-1px] h-[3px] bg-white/60"
            initial={{ width: "0%", left: "0%", opacity: 0.2 }}
            animate={
              activeThread === threadIdx
                ? { width: "40%", left: "60%", opacity: 1 }
                : { width: "0%", left: "100%", opacity: 0 }
            }
            transition={{ 
              duration: 1.5, 
              ease: "circInOut" 
            }}
          />
        </div>
      ))}
      <div className="mt-2 text-[7px] text-white/20 tracking-widest text-right">
        CTX_SWITCH_ACTIVE
      </div>
    </div>
  );
};

// --- MAIN BACKGROUND COMPONENT ---
const CSParallaxHero = () => {
  const { scrollYProgress } = useScroll();

  // Gentle parallax movements
  const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yMedium = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const yReverse = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  // Rotations
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const rotateFast = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none select-none z-0 text-white font-mono">
      
      {/* 1. Subtle Data Stream Background */}
      <SubtleDataStream />

      {/* 2. Ultra-Faint Computation Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3. CENTER: Massive Overlay Typography (Watermark style) */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]) }}
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-[0.04] whitespace-nowrap"
      >
        <h1 className="text-[12vw] font-bold tracking-tighter uppercase m-0 leading-none">
          SYS_KERN_0
        </h1>
      </motion.div>

      {/* 4. TOP LEFT: System Specifications */}
      <motion.div
        style={{ y: yMedium }}
        className="absolute top-[15%] left-[5%] md:left-[8%] w-64 border-l border-white/10 pl-4 opacity-90"
      >
        <div className="pb-2 mb-2 flex justify-between items-center">
          <span className="text-[8px] tracking-[0.2em] text-white/50">ENV_SPEC</span>
          <span className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
        </div>
        <ul className="text-[9px] space-y-2 text-white/30 tracking-wider">
          <li className="flex justify-between"><span>MEM_ALLOC:</span> <span>DYNAMIC</span></li>
          <li className="flex justify-between"><span>V_TREE:</span> <span>BALANCED</span></li>
          <li className="flex justify-between"><span>LATENCY:</span> <span>12ms</span></li>
        </ul>
      </motion.div>

      {/* 5. CENTER LEFT: Abstract Scheduling Vis */}
      <motion.div
        style={{ y: yReverse }}
        className="absolute top-[50%] left-[8%] md:left-[10%] -translate-y-1/2"
      >
        <ThreadScheduler />
      </motion.div>

      {/* 6. CENTER RIGHT: Geometric Network Topology */}
      <motion.div
        style={{ y: ySlow, rotate: rotateSlow }}
        className="absolute top-[10%] right-[-20%] md:right-[-5%] w-[700px] h-[700px] opacity-[0.04]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none">
          <circle cx="50" cy="50" r="48" strokeWidth="0.1" strokeDasharray="0.5 2" />
          <circle cx="50" cy="50" r="35" strokeWidth="0.1" />
          
          <g strokeWidth="0.1" opacity="0.8">
            <line x1="50" y1="15" x2="80" y2="35" />
            <line x1="80" y1="35" x2="80" y2="65" />
            <line x1="80" y1="65" x2="50" y2="85" />
            <line x1="50" y1="85" x2="20" y2="65" />
            <line x1="20" y1="65" x2="20" y2="35" />
            <line x1="20" y1="35" x2="50" y2="15" />
            
            <line x1="50" y1="15" x2="50" y2="50" />
            <line x1="80" y1="35" x2="50" y2="50" />
            <line x1="20" y1="65" x2="50" y2="50" />
          </g>

          <g fill="currentColor">
            <circle cx="50" cy="15" r="0.5" />
            <circle cx="80" cy="35" r="0.5" />
            <circle cx="80" cy="65" r="0.5" />
            <circle cx="50" cy="85" r="0.5" />
            <circle cx="20" cy="65" r="0.5" />
            <circle cx="20" cy="35" r="0.5" />
            <circle cx="50" cy="50" r="1.5" fill="none" strokeWidth="0.2" />
          </g>
        </svg>
      </motion.div>

      {/* 7. BOTTOM LEFT: Virtual Memory Pointer */}
      <motion.div
        style={{ y: yReverse }}
        className="absolute bottom-[15%] left-[8%] md:left-[10%] opacity-20 flex flex-col items-start"
      >
        <div className="flex items-end gap-2 mb-1">
          <div className="w-[1px] h-8 bg-white/20" />
          <div className="text-[8px] tracking-[0.3em] mb-1 uppercase">Heap Space</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] text-white/40">0x00</span>
          <div className="w-32 h-[1px] bg-white/10 relative">
            <motion.div
              className="absolute top-[-1px] w-1 h-[3px] bg-white/60"
              animate={{ left: ["0%", "100%", "30%", "80%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[8px] text-white/40">0xFF</span>
        </div>
      </motion.div>

      {/* 8. TOP RIGHT: DFS Traversal Node */}
      <motion.div
        style={{ y: yFast, rotate: rotateFast }}
        className="absolute top-[15%] right-[15%] w-20 h-20 opacity-[0.15]"
      >
        <svg viewBox="0 0 50 50" className="w-full h-full stroke-current fill-none">
          <circle cx="25" cy="25" r="24" strokeWidth="0.2" strokeDasharray="1 3" />
          <circle cx="25" cy="10" r="2" strokeWidth="0.5" />
          <circle cx="15" cy="25" r="2" strokeWidth="0.5" />
          <circle cx="35" cy="25" r="2" strokeWidth="0.5" />
          <path d="M 23 12 L 17 23 M 27 12 L 33 23" strokeWidth="0.2" />
        </svg>
        <div className="absolute top-full mt-2 text-center w-full text-[7px] tracking-widest text-white/40">
          NODE_01
        </div>
      </motion.div>

      {/* 9. BOTTOM RIGHT: Stream Telemetry */}
      <motion.div
        style={{ y: yFast }}
        className="absolute bottom-[12%] right-[5%] md:right-[8%] border-l border-white/20 pl-4 opacity-20"
      >
        <div className="text-[8px] uppercase tracking-[0.4em] mb-1 text-white/40">
          Telemetry
        </div>
        <div className="text-[10px] tracking-wider font-mono text-white/60">
          TX: <span className="text-white/30">e3b0c442...</span>
        </div>
        <div className="w-full h-[1px] bg-white/10 mt-3 overflow-hidden">
          <motion.div
            className="h-full bg-white/40 w-1/4"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

    </div>
  );
};

export default CSParallaxHero;