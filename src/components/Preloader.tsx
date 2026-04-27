import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const defaultWords = [
  "Hello", 
  "नमस्ते", 
  "Hola", 
  "Bonjour", 
  "Ciao", 
  "Olá", 
  "こんにちは", 
  "David Jennicson"
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const { encodedName: routeEncodedName } = useParams();
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [words, setWords] = useState(defaultWords);

  useEffect(() => {
    // Check for personalized name in URL params (?n=BASE64) or route params (/hi/:name)
    const params = new URLSearchParams(window.location.search);
    const encodedName = routeEncodedName || params.get("n");
    
    if (encodedName) {
      try {
        const decoded = atob(encodedName);
        // Expecting format: "startTime|endTime|name" or "name"
        const parts = decoded.split("|");
        
        let name = "";
        let isVisible = false;
        const now = Date.now() / 1000;

        if (parts.length === 3) {
          const [start, end, pName] = parts;
          name = pName;
          isVisible = now >= parseInt(start, 10) && now <= parseInt(end, 10);
        } else if (parts.length === 2) {
          const [end, pName] = parts;
          name = pName;
          isVisible = now <= parseInt(end, 10);
        } else {
          name = decoded;
          isVisible = true;
        }

        if (name && isVisible) {
          // Append the name to all greetings except the final one
          const personalizedWords = defaultWords.map((word, i) => 
            i === defaultWords.length - 1 ? word : `${word} ${name}`
          );
          setWords(personalizedWords);
        }
      } catch (e) {
        console.error("Failed to decode personalized data", e);
      }
    }

    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    // Disable scroll during preloader
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        onComplete();
      }, 1000);
      return;
    }
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
    
    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div
      variants={{
        initial: { top: 0 },
        exit: { 
          top: "-100vh", 
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
        }
      }}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
    >
      {dimension.width > 0 && (
        <>
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Initializing Portfolio</span>
            </motion.div>
            
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white text-4xl md:text-6xl font-display font-medium tracking-tighter"
            >
              {words[index]}
            </motion.p>
            
            {/* Elegant Progress Line */}
            <div className="absolute -bottom-24 w-48 h-[1px] bg-white/5 overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "100%" }}
                 transition={{ duration: 2.5, ease: "easeInOut" }}
                 className="w-full h-full bg-primary/40"
               />
            </div>
          </div>
          
          <svg className="absolute top-0 w-full h-[calc(100%+300px)] fill-[#0a0a0a]">
            <motion.path variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;
