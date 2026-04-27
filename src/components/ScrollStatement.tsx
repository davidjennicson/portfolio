import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

// --- REFINED ELEGANT BACKGROUND LAYERS ---
const BackgroundLayers = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const yGiantText = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const xGiantText = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  
  const rotateGrid = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scaleGrid = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);
  
  const yBlob1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. Fixed Cinematic Noise (Seamless background-image instead of inline SVG) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 2. Abstract Architectural Wireframe */}
      <motion.div 
        className="absolute top-[40%] right-[-10%] md:right-[-5%] -translate-y-1/2 opacity-[0.04] text-foreground"
        style={{ rotate: rotateGrid, scale: scaleGrid }}
      >
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
          <circle cx="50" cy="50" r="40" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="20" strokeDasharray="0.5 1" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="22" y1="22" x2="78" y2="78" />
          <line x1="22" y1="78" x2="78" y2="22" />
          <rect x="25" y="25" width="50" height="50" strokeWidth="0.05" />
        </svg>
      </motion.div>

      {/* 3. Outlined Faded Watermark Typography (Far more elegant) */}
      <motion.div 
        className="absolute top-[10%] left-[-2%] z-0"
        style={{ y: yGiantText, x: xGiantText }}
      >
        <h1 
          className="text-[35vw] font-bold tracking-tighter leading-none m-0 text-transparent opacity-20"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
        >
          01
        </h1>
      </motion.div>

      {/* 4. Ambient Gradient Meshes (Soft Lighting) */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] z-0"
        style={{ y: yBlob1 }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] z-0"
        style={{ y: yBlob2 }}
      />
    </div>
  );
};

// --- MAIN COMPONENT ---
const ScrollStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const textParts = [
    { text: "I am an ", style: "text-foreground" },
    { text: "Electronics and Computer Science Engineer", style: "text-primary italic" },
    { text: " with a strong foundation in software development and a passion for building innovative solutions.", style: "text-foreground" },
  ];
  
  const fullText = textParts.map(p => p.text).join("");
  const charCount = useTransform(scrollYProgress, [0.3, 0.5], [0, fullText.length]);
  const smoothCharCount = useSpring(charCount, { stiffness: 150, damping: 25 });

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-secondary flex items-center justify-center overflow-hidden">
      
      {/* Notice: Removed padding here so background stretches 100vw */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* FULL BLEED BACKGROUND */}
        <BackgroundLayers scrollYProgress={scrollYProgress} />
        
        {/* FOREGROUND CONTENT - Padding moved to this wrapper */}
        <motion.div style={{ y }} className="relative z-10 w-full max-w-5xl px-6 md:px-12">
          <div className="mb-8 md:mb-12 flex items-center gap-4">
             <span className="h-[1px] w-8 bg-muted-foreground/30 block" />
             <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">01 — Mission</span>
          </div>

          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-medium tracking-tight leading-[1.1]">
            {textParts.reduce((acc: { elements: JSX.Element[], currentOffset: number }, part, partIdx) => {
              const partStart = acc.currentOffset;
              const partEnd = partStart + part.text.length;
              
              acc.elements.push(
                <motion.span 
                  key={partIdx} 
                  className={part.style}
                  style={{ opacity: useTransform(smoothCharCount, (v) => (v >= partEnd ? 1 : v >= partStart ? 1 : 0.2)) }}
                >
                  {part.text.split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      style={{ opacity: useTransform(smoothCharCount, (v) => (v >= partStart + charIdx ? 1 : 0.2)) }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              );
              acc.currentOffset = partEnd;
              return acc;
            }, { elements: [], currentOffset: 0 }).elements}
          </h2>
        </motion.div>

      </div>
    </section>
  );
};

export default ScrollStatement;