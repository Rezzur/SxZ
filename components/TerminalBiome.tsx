"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TerminalBiome() {
  // --- Состояния Терминала ---
  const [stage, setStage] = useState("idle");
  const [lines, setLines] = useState<string[]>([]);
  
  // --- Состояния Окна (Windows-style) ---
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    "> MB_BIOS v4.0.26 INITIALIZED",
    "> CHECKING MEMORY... 64GB DDR5 OK",
    "> MOUNTING /dev/sda1/projects...",
    "> LOADING CORE_MODULES...",
    "> ESTABLISHING SECURE CONNECTION...",
    "> ACCESS GRANTED.",
  ];

  const commands = [
    "git checkout production",
    "docker-compose up -d --build",
    "npm run optimize",
  ];

  // Скролл
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  // Запуск загрузки
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && stage === "idle") {
          startBoot();
        }
      },
      { threshold: 0.6 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, [stage]);

  const startBoot = async () => {
    setStage("booting");
    for (let line of bootSequence) {
      await new Promise(r => setTimeout(r, 400));
      setLines(prev => [...prev, line]);
    }
    setStage("processing");
    for (let cmd of commands) {
      await new Promise(r => setTimeout(r, 300));
      setLines(prev => [...prev, `[EXECUTING]: ${cmd}`]);
    }
    await new Promise(r => setTimeout(r, 600));
    setStage("active");
  };

  const handleCommand = async (type: string) => {
    let newLines: string[] = [];
    if (type === "stack") {
      newLines = [
        "------------------------------------------------",
        "[SYSTEM]: ПОЛНЫЙ СТЕК ТЕХНОЛОГИЙ:",
        "> DESIGN: Figma / Spline 3D / Adobe CC",
        "> FRONTEND: Next.js 15 / TypeScript / React",
        "> BACKEND: Java (Spring Boot) / Python (FastAPI)",
        "> INFRA: Docker / Kubernetes / AWS",
        "> DATABASE: PostgreSQL / Redis / MongoDB",
        "[SYSTEM]: ЗАГРУЗКА ЗАВЕРШЕНА."
      ];
    } else if (type === "team") {
      newLines = [
        "------------------------------------------------",
        "[SYSTEM]: ДАННЫЕ КОМАНДЫ:",
        "> ЗЫРЯНОВ ЯН — Lead Backend Engineer",
        "> СЕРГЕЙ СМИРНОВ — Senior Frontend Lead",
        "[SYSTEM]: СТАТУС: ACTIVE."
      ];
    } else if (type === "contact") {
      newLines = [
        "------------------------------------------------",
        "[SYSTEM]: СВЯЗЬ:",
        "> TG: https://t.me/your_project_link",
        "> MAIL: work@dev-team.pro",
        "[SYSTEM]: ОЖИДАНИЕ..."
      ];
    }

    for (let line of newLines) {
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, line]);
    }
  };

  // --- ЛОГИКА ТРЕЯ (Как в Windows) ---
  const toggleTerminal = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

return (
    <div 
      ref={constraintsRef}
      className="h-full w-full bg-[#050505] text-[#4af626] font-mono p-2 md:p-4 flex items-center justify-center overflow-hidden relative"
    >
      {/* ФОНОВЫЙ ЭФФЕКТ */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* ПАНЕЛЬ ЗАДАЧ (TRAY) */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 md:gap-4 bg-zinc-900/80 p-1.5 md:p-2 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTerminal}
          className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 relative ${
            isOpen && !isMinimized ? 'bg-green-500 text-black shadow-[0_0_25px_rgba(74,246,38,0.4)]' : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          <span className="text-lg md:text-2xl font-bold">{">_"}</span>
          {/* Индикатор "запущенного" приложения под иконкой */}
          {isOpen && (
            <div className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full" />
          )}
        </motion.button>
      </div>

      {/* ОКНО ТЕРМИНАЛА */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div 
            ref={terminalRef}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragHandleClassName="drag-handle"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="flex flex-col w-full max-w-lg md:max-w-4xl bg-black/95 border border-[#4af626]/20 shadow-[0_40px_100px_rgba(0,0,0,1)] z-10 overflow-hidden rounded-lg md:rounded-xl"
          >
            {/* ШАПКА ОКНА (Drag Handle) */}
            <div className="drag-handle flex justify-between items-center border-b border-[#4af626]/10 p-2 md:p-4 bg-zinc-900/60 cursor-grab active:cursor-grabbing">
              <div className="flex gap-1.5 md:gap-2">
                {/* Закрыть совсем */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors" 
                />
                {/* Свернуть в трей */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} 
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors" 
                />
              </div>
              <span className="text-[8px] md:text-[10px] opacity-40 uppercase tracking-[0.2em] select-none">dev@terminal:~</span>
            </div>

            {/* ЗОНА ТЕКСТА */}
            <div 
              ref={scrollRef}
              className="h-[250px] md:h-[400px] overflow-y-auto p-3 md:p-6 space-y-1 custom-terminal-scroll"
              style={{ scrollbarWidth: 'none' }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <style jsx>{` .custom-terminal-scroll::-webkit-scrollbar { display: none; } `}</style>
              
              {lines.map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs md:text-sm leading-relaxed ${
                    line.includes("EXECUTING") ? "text-blue-400" : 
                    line.includes("SYSTEM") ? "text-yellow-500 font-bold" : 
                    line.includes("ЗЫРЯНОВ") || line.includes("СЕРГЕЙ") ? "text-white" : ""
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 md:w-2.5 md:h-5 bg-[#4af626] shadow-[0_0_8px_#4af626] align-middle"
              />
            </div>

            {/* ЗОНА КНОПОК */}
            <div className="border-t border-[#4af626]/10 p-3 md:p-6 bg-black/40" onPointerDown={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                {stage === "active" ? (
                  <motion.div 
                    key="buttons"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4"
                  >
                    <button onClick={() => handleCommand("stack")} className="border border-[#4af626]/30 p-2 md:p-3 hover:bg-[#4af626] hover:text-black transition-all text-[10px] md:text-xs font-bold uppercase tracking-tighter">
                      [01] Стек Технологий
                    </button>
                    <button onClick={() => handleCommand("team")} className="border border-[#4af626]/30 p-2 md:p-3 hover:bg-[#4af626] hover:text-black transition-all text-[10px] md:text-xs font-bold uppercase tracking-tighter">
                      [02] Наша Команда
                    </button>
                    <button onClick={() => handleCommand("contact")} className="border border-[#4af626]/30 p-2 md:p-3 hover:bg-[#4af626] hover:text-black transition-all text-[10px] md:text-xs font-bold uppercase tracking-tighter">
                      [03] Связаться
                    </button>
                  </motion.div>
                ) : (
                  <div className="h-[44px] flex items-center justify-center text-[8px] md:text-[10px] uppercase tracking-[0.3em] opacity-20">
                    Подготовка консоли...
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}