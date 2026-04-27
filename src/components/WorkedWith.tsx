import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "motion/react";
import content from "@/content/content.json";
import ErrorBoundary from "./ErrorBoundary";

const Lanyard = lazy(() => import("./Lanyard"));

const WorkedWith = () => {
  const { experience } = content;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (i: number) => {
    setActiveIndex(prev => (prev === i ? null : i));
  };

  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-background">
      <div className="mb-20 flex flex-col gap-2">
        <div className="overflow-hidden">
          <motion.span 
            initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1]}} 
            className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground block"
          >
            03 — Experience
          </motion.span>
        </div>
        <div className="overflow-hidden pb-2">
          <motion.h2 
            initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1], delay: 0.1}} 
            className="font-display font-medium text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tight text-foreground uppercase"
          >
            {experience.title}
          </motion.h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* 3D Lanyard Area (Left / Top) */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-24 h-[400px] lg:h-[650px] lg:-ml-12 cursor-none">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="font-mono text-xs text-muted-foreground animate-pulse">
                    Loading 3D Physics...
                  </div>
                </div>
              }
            >
              <Lanyard 
                position={[0, 0, 20]} 
                gravity={[0, -40, 0]} 
                title={activeIndex !== null ? experience.items[activeIndex].name : "PORTFOLIO"}
                subtitle={activeIndex !== null ? experience.items[activeIndex].sector : "ARCHIVE"}
              />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Accordion List (Right) */}
        <div className="w-full lg:w-2/3">
          {experience.items.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                className="group border-t border-border transition-colors duration-300 cursor-none"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => handleToggle(i)}
                data-hover="true"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 group-hover:pl-4 transition-all duration-500">
                  <h3
                    className={`font-display font-medium text-[clamp(2rem,5vw,5rem)] leading-none tracking-tighter uppercase transition-colors duration-500 ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </h3>

                  <span className={`font-sans text-[10px] tracking-widest uppercase mt-4 md:mt-0 transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.sector}
                  </span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 md:pl-4 md:w-3/4">
                        <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default WorkedWith;
