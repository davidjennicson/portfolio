import { motion } from "motion/react";
import content from "@/content/content.json";

const SkillsShelf = () => {
  const skills = content.skills.items;

  return (
    <section className="py-24 md:py-32 bg-secondary px-6 md:px-12">
      <div className="mb-16 flex flex-col gap-2">
        <div className="overflow-hidden">
          <motion.span 
            initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1]}} 
            className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground block"
          >
            04 — Toolkit
          </motion.span>
        </div>
        <div className="overflow-hidden pb-2">
          <motion.h2 
            initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1], delay: 0.1}} 
            className="text-[clamp(2.5rem,6vw,5rem)] font-display font-medium tracking-tight leading-none uppercase text-foreground"
          >
            Core Stack
          </motion.h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.03, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col gap-3 group"
            data-hover="true"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-background rounded-sm overflow-hidden relative">
               <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: skill.color }}
                />
               <img
                  src={`https://cdn.simpleicons.org/${skill.slug}/000000`}
                  alt={skill.name}
                  className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity duration-300 dark:invert"
                />
            </div>
            <div>
              <h3 className="font-sans font-medium text-xs text-foreground">{skill.name}</h3>
              <p className="font-sans text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">Technology</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsShelf;
