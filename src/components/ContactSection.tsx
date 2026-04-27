import { useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabaseClient";

const socials = [
  { name: "GitHub", url: "https://github.com/davidjennicson", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/davidjennicson", icon: "linkedin" },

];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", bot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.bot) return; // Honeypot
    
    const { name, email, message } = formData;
    if (name.length < 2 || !email.includes('@') || message.length < 10) {
      setToast("Please fill all fields correctly.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("VisitorMessages").insert([{ name, email, message }]);
      if (error) throw error;
      
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", bot: "" });
      setToast("Message sent successfully!");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setToast("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="pt-24 md:pt-32 pb-6 px-6 md:px-12 bg-background relative border-t border-border">
      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-widest px-6 py-4 shadow-xl z-50 rounded-sm">
          {toast}
          <button onClick={() => setToast("")} className="ml-6 opacity-70 hover:opacity-100">×</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-16 md:gap-24 mb-32">
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col gap-2 mb-8">
            <div className="overflow-hidden">
              <motion.span 
                initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1]}} 
                className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground block"
              >
                05 — Contact
              </motion.span>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.h2 
                initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1], delay: 0.1}} 
                className="text-[clamp(3rem,8vw,6rem)] font-display font-medium tracking-tight leading-[0.9] uppercase"
              >
                Start a<br/>Project
              </motion.h2>
            </div>
            <div className="overflow-hidden mt-4">
              <motion.a 
                initial={{y: "100%"}} whileInView={{y: 0}} viewport={{once: true}} transition={{duration: 0.6, ease: [0.19,1,0.22,1], delay: 0.2}} 
                href="mailto:davidjennicson@gmail.com" className="font-sans text-sm md:text-base tracking-wide hover-underline inline-block pb-1 text-muted-foreground hover:text-foreground transition-colors" data-hover="true"
              >
                davidjennicson@gmail.com
              </motion.a>
            </div>
          </div>

          <div className="flex gap-8 mt-16 md:mt-24">
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors hover-underline" data-hover="true">
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <input type="text" style={{ display: "none" }} value={formData.bot} onChange={e => setFormData(p => ({ ...p, bot: e.target.value }))} />
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">Name</label>
              <input
                type="text" required value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                className="bg-transparent border-b border-border py-3 font-sans text-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors rounded-none"
                placeholder="John Doe"
                data-hover="true"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email" required value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className="bg-transparent border-b border-border py-3 font-sans text-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors rounded-none"
                placeholder="john@example.com"
                data-hover="true"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                required rows={3} value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                className="bg-transparent border-b border-border py-3 font-sans text-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none rounded-none"
                placeholder="Tell me about your vision..."
                data-hover="true"
              />
            </div>

            <button type="submit" disabled={loading} data-hover="true" className="self-start bg-primary text-primary-foreground px-8 py-4 rounded-sm hover:bg-foreground transition-colors duration-300 mt-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest block">
                {loading ? "Sending..." : submitted ? "Message Sent" : "Submit Request"}
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <span className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase">© {new Date().getFullYear()} David Jennicson</span>
        <span className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
          Based in Mumbai
        </span>
      </div>
    </section>
  );
};

export default ContactSection;