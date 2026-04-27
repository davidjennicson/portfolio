import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import content from "@/content/content.json";

const Project = () => {
  const { id } = useParams<{ id: string }>();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = content.projects.items.find((p: any) => p.id === id);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // A dynamically generated blog-like case study content based on the project data.
  // In a real scenario, this could be extended with more detailed markdown content per project.
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* HEADER SECTION */}
      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm uppercase tracking-wider mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        
        <p className="font-mono text-xs sm:text-sm tracking-widest text-primary mb-4 uppercase">
          {project.tags}
        </p>

        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight mb-8">
          {project.title.replace('\n', ' ')}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border/50">
          {project.stats.map((stat: any, i: number) => (
            <div key={i}>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2 uppercase">
                {stat.label}
              </p>
              <p className="font-display font-bold text-lg text-foreground whitespace-pre-line">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-secondary">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* BODY CONTENT (BLOG LIKE) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral dark:prose-invert prose-lg">
        <h2 className="font-display text-2xl font-bold mb-4">Project Overview</h2>
        <p className="lead text-xl text-muted-foreground mb-8">
          {project.description}
        </p>

        <h3 className="font-display text-xl font-bold mb-4 mt-12">The Challenge</h3>
        <p className="mb-6">
          When approaching {project.title.split('\n')[0]}, the primary goal was to create a robust and scalable solution that addressed the specific needs of the target audience. The challenge lay in integrating complex functionalities while maintaining a seamless and intuitive user experience. Performance optimization and resolving architectural bottlenecks were paramount.
        </p>

        <h3 className="font-display text-xl font-bold mb-4 mt-12">The Solution</h3>
        <p className="mb-6">
          By leveraging the core tech stack highlighted above, we engineered a system that prioritizes both performance and maintainability. Key features such as automated workflows, real-time data synchronization, and a responsive layout were critical in delivering value.
        </p>
        
        <p className="mb-6">
          The development process involved rigorous testing and iterative feedback loops to ensure every module met strict quality standards before deployment.
        </p>

        <h3 className="font-display text-xl font-bold mb-4 mt-12">Results & Impact</h3>
        <p className="mb-6">
          Post-launch, the platform demonstrated significant improvements in end-user engagement and overall system reliability. It successfully accommodated the initial surge in traffic without performance degradation, proving the efficacy of the underlying architecture.
        </p>
      </div>

      {/* FOOTER CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="bg-secondary/30 rounded-2xl p-10 border border-border/50">
          <h3 className="font-display text-2xl font-bold mb-4">Interested in working together?</h3>
          <p className="text-muted-foreground mb-8">Let's build something extraordinary.</p>
          <Link 
            to="/" 
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Project;
