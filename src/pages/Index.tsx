import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import CustomCursor from "@/components/CustomCursor";
import ScrollStatement from "@/components/ScrollStatement";
import FeaturedWork from "@/components/FeaturedWork";
import WorkedWith from "@/components/WorkedWith";
import SkillsShelf from "@/components/SkillsShelf";
import ContactSection from "@/components/ContactSection";
import LiveClock from "@/components/LiveClock";
import CSParallaxElements from "@/components/CSParallaxElements";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "motion/react";
import DraggableDoodle from "@/components/DraggableDoodle";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Top-level hooks for parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);

  const heyX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const heyY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const davidX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const davidY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Preloader key="loader" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          ref={containerRef}
          className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white relative overflow-x-clip"
        >
          <CustomCursor />

          {/* ── NAV ── */}
          {/* ── REDESIGNED NAV ── */}
          <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 md:px-12 flex items-center justify-between pointer-events-none">

            {/* Left: Branding */}
            <div className="pointer-events-auto flex flex-col mix-blend-difference text-white">
              <span className="font-display text-lg font-bold tracking-tighter leading-none">DAVID J.</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="font-sans text-[9px] text-white/50 tracking-[0.2em] uppercase">Available for work</span>
              </div>
            </div>

            {/* Center: Floating Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto hidden sm:block">
              <div className="flex items-center gap-1 p-1 bg-background/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
                <a href="#work" className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all duration-300" data-hover="true">Work</a>
                <a href="#about" className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all duration-300" data-hover="true">About</a>
                <div className="w-[1px] h-4 bg-white/10 mx-2" />
                <a href="#contact" className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-primary text-white shadow-[0_10px_20px_-5px_rgba(255,79,0,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(255,79,0,0.6)] hover:-translate-y-0.5 transition-all duration-300" data-hover="true">Connect</a>
              </div>
            </div>

            {/* Right: Meta Info */}
            <div className="pointer-events-auto flex items-center gap-8 mix-blend-difference text-white">
              <div className="hidden lg:flex flex-col items-end">
                <span className="font-sans text-[8px] text-white/40 tracking-[0.2em] uppercase mb-1">Local Time</span>
                <LiveClock />
              </div>

              {/* Mobile Menu Trigger (Placeholder for now) */}
              <button className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full" data-hover="true">
                <div className="w-5 h-[1px] bg-white" />
                <div className="w-5 h-[1px] bg-white" />
              </button>
            </div>
          </nav>

          {/* ── BACKGROUND LAYERS (Wrapped to prevent overflow) ── */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Parallax Background Pattern */}
            <motion.div
              style={{ y: backgroundY }}
              className="absolute inset-0 opacity-[0.03]"
            >
              <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at center, black 1px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
            </motion.div>

            <CSParallaxElements />

            {/* Ambient Glow */}
            <motion.div
              style={{ y: glowY }}
              className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full mix-blend-screen"
            />
          </div>

          {/* Terminal Prompt Badge */}
          <motion.div
            style={{ y: badgeY }}
            className="absolute top-[35%] right-[5%] border border-border bg-background/50 backdrop-blur-sm px-4 py-2 rounded-sm pointer-events-none z-10"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="text-primary">~</span> ./execute_logic.sh <span className="w-1.5 h-3 bg-foreground/70 animate-pulse" />
            </span>
          </motion.div>

          {/* ── HERO ── */}
          <section className="relative h-[100svh] w-full flex flex-col justify-end p-6 md:p-12 pb-20 md:pb-32 z-10">

            <div className="max-w-[1600px] w-full mx-auto relative">
              <h1 className="font-display font-medium leading-[0.8] tracking-tighter text-[clamp(4rem,14vw,14rem)] uppercase flex flex-col gap-2 md:gap-4 w-full">

                {/* Top Line */}
                <div className="w-full flex justify-center md:justify-start">
                  <DraggableDoodle>
                    <motion.span
                      className="block"
                      style={{ x: heyX, y: heyY }}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                    >
                      HEY
                    </motion.span>
                  </DraggableDoodle>
                </div>

                {/* Bottom Line */}
                <div className="w-full flex justify-center md:justify-end">
                  <DraggableDoodle>
                    <motion.span
                      className="block flex items-center gap-4 md:gap-8 text-foreground"
                      style={{ x: davidX, y: davidY }}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                    >
                      <span className="text-primary text-[clamp(2rem,6vw,8rem)] mt-2 md:mt-4 hidden sm:block">•</span>
                      <span>I AM DAVID</span>
                    </motion.span>
                  </DraggableDoodle>
                </div>

              </h1>

              <div className="flex justify-center mt-12 md:mt-20">
                <motion.a
                  href="/DavidJennicson_resume.pdf"
                  download
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-primary rounded-full overflow-hidden shadow-[0_20px_40px_-15px_rgba(255,79,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(255,79,0,0.5)] transition-all duration-500"
                  data-hover="true"
                >
                  <span className="relative z-10 font-sans text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white">Download Resume</span>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse relative z-10" />

                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Slide-out Effect */}
                  <div className="absolute inset-0 bg-black/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                </motion.a>
              </div>
            </div>

            <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 flex items-center gap-4">
              <span className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground hidden sm:block">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-foreground"
              />
            </div>
          </section>

          {/* ── SECTIONS ── */}
          <ScrollStatement />
          <FeaturedWork />
          <WorkedWith />
          <SkillsShelf />
          <ContactSection />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
