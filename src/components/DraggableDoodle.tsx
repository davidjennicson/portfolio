import { useState, useRef, useCallback } from "react";

const SNAP_MESSAGES = [
  "No please don't touch, I spent hours on this! 🥺",
  "Hey! That was pixel perfect! 😤",
  "Auto-layout says NO 🔒",
  "Stop moving my brain! 🧠",
  "Ctrl+Z incoming... 😎",
  "Hands off the master component! 💎",
  "That's not a Figma layer! 😤",
  "I spent too long on this spacing... 📏",
];

interface DraggableDoodleProps {
  children: React.ReactNode;
  className?: string;
  floatDelay?: number;
}

const DraggableDoodle = ({ children, className = "", floatDelay = 0 }: DraggableDoodleProps) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnappingBack, setIsSnappingBack] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showBorder, setShowBorder] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, scale: 1 });
  const hasMoved = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setMessage(null);
    setIsSnappingBack(false);
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...offset };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isResizing) return;
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    setOffset({ x: startOffset.current.x + dx, y: startOffset.current.y + dy });
  }, [isDragging, isResizing]);

  const snapBack = useCallback(() => {
    setIsSnappingBack(true);
    const msg = SNAP_MESSAGES[Math.floor(Math.random() * SNAP_MESSAGES.length)];
    setMessage(msg);
    
    // Tiny delay for the snap
    setTimeout(() => {
      setOffset({ x: 0, y: 0 });
      setScale(1);
    }, 20);

    setTimeout(() => {
      setIsSnappingBack(false);
      setMessage(null);
    }, 3000);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (hasMoved.current) snapBack();
  }, [isDragging, snapBack]);

  const handleResizeDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setMessage(null);
    setIsSnappingBack(false);
    resizeStart.current = { x: e.clientX, scale };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [scale]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!isResizing) return;
    const dx = e.clientX - resizeStart.current.x;
    const newScale = Math.max(0.5, Math.min(2.5, resizeStart.current.scale + dx / 150));
    setScale(newScale);
  }, [isResizing]);

  const handleResizeUp = useCallback(() => {
    if (!isResizing) return;
    setIsResizing(false);
    if (Math.abs(scale - 1) > 0.05) snapBack();
  }, [isResizing, scale, snapBack]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowBorder(true)}
      onMouseLeave={() => { if (!isDragging && !isResizing) setShowBorder(false); }}
    >
      {/* ── FIGMA STYLE CURSOR LABEL ── */}
      {(isDragging || isResizing || showBorder) && (
        <div
          className="absolute -top-10 left-0 z-30 flex items-center gap-1.5"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
        >
          {/* Cursor SVG */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary drop-shadow-sm">
            <path d="M0 0L14 4.5L7.5 7.5L4.5 14L0 0Z" fill="currentColor" />
          </svg>
          {/* Name Tag */}
          <div className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm whitespace-nowrap shadow-sm">
             Visitor
          </div>
        </div>
      )}

      {/* Selection border */}
      {(showBorder || isDragging || isResizing || isSnappingBack) && (
        <div
          className="absolute -inset-3 border border-primary/40 rounded-sm pointer-events-none z-10"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
        />
      )}

      {/* Resize handle - bottom right */}
      {(showBorder || isResizing) && (
        <div
          className="absolute -bottom-4 -right-4 w-2.5 h-2.5 bg-white border border-primary rounded-full cursor-nwse-resize z-20 hover:scale-125 transition-transform"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
          onPointerDown={handleResizeDown}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeUp}
        />
      )}

      {/* Snap-back message */}
      {message && (
        <div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-foreground text-background text-[10px] font-sans font-bold uppercase tracking-widest rounded-full shadow-xl animate-reveal whitespace-nowrap"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
        >
          {message}
        </div>
      )}

      {/* Main content */}
      <div
        className={`cursor-grab active:cursor-grabbing transition-transform ${className}`}
        style={{
          touchAction: "none",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : (isDragging || isResizing ? "none" : undefined),
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableDoodle;

