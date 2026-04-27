
import content from "@/content/content.json";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

// Import Mockups
import NexusCRMMockup from "./mockups/NexusCRMMockup";
import KissanMartMockup from "./mockups/KissanMartMockup";
import SwasthyaMockup from "./mockups/SwasthyaMockup";

const MockupRenderer = ({ id, image }: { id: string; image: string }) => {
  switch (id) {
    case "nexus-crm": return <NexusCRMMockup />;
    case "kissan-mart": return <KissanMartMockup />;
    case "swasthya-net": return <SwasthyaMockup />;
    default:
      return (
        <img
          src={image}
          alt="Project Preview"
          loading="lazy"
          className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
        />
      );
  }
};

const ProjectCard = ({ project }: { project: (typeof content.projects.items)[0] }) => (
  <Link to={`/project/${project.id}`} data-hover="true" className="block h-[70vh] group focus:outline-none bg-background">
    <div className="h-full flex flex-col md:flex-row relative border-t border-border group-hover:border-primary transition-colors duration-500">
      
      {/* LEFT CONTENT */}
      <div className="p-8 md:p-12 flex flex-col justify-between md:w-[45%] z-10 border-r border-border">
        <div>
          <p className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase mb-6">
            {project.tags}
          </p>

          <h3 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground whitespace-pre-line mb-6 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm hidden md:block">
            {project.description}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex gap-8">
            {project.stats.map((stat, i) => (
              <div key={i}>
                <p className="font-display font-medium text-lg text-foreground whitespace-pre-line leading-none mb-1">
                  {stat.value}
                </p>
                <p className="font-sans text-[9px] tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <span className="font-sans text-[10px] tracking-widest text-foreground group-hover:text-primary transition-colors uppercase hover-underline">
            {project.cta}
          </span>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative md:w-[55%] h-full bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none mix-blend-multiply" />
        <motion.div 
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <MockupRenderer id={project.id} image={project.image} />
        </motion.div>
      </div>
    </div>
  </Link>
);

const FeaturedWork = () => {
  const { projects } = content;

  return (
    <section id="work" className="pt-24 md:pt-32 pb-12 bg-background">
      <div className="px-6 md:px-12 mb-16 flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden">
            <motion.span 
              initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1]}} 
              className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground block"
            >
              02 — Work
            </motion.span>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h2 
              initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1], delay: 0.1}} 
              className="font-display font-medium text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tight text-foreground uppercase"
            >
              {projects.sectionTitle}
            </motion.h2>
          </div>
        </div>
      </div>

      <div className="relative w-full pb-32">
        {projects.items.map((project, i) => (
          <div 
            key={i} 
            className="sticky w-full origin-top"
            style={{ 
              top: `calc(8rem + ${i * 2}rem)`, // Stagger the top offset so they stack visibly
              zIndex: i + 1 
            }}
          >
            {/* We add a motion wrapper to subtly scale down older cards if we wanted, but native sticky is cleaner */}
            <div className="w-full shadow-2xl rounded-t-2xl overflow-hidden">
               <ProjectCard project={project} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;