"use client";
import React, { useState, useRef } from "react";
import { DollarSign, Users, BarChart3, Globe, Activity } from "lucide-react";

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface Widget {
  id: number;
  x: number; 
  y: number; 
  w: number; 
  h: number; 
  title: string;
  icon: React.ReactNode;
  type: 'metric' | 'chart' | 'status';
  data?: { value: string; trend?: string; positive?: boolean };
}

export default function ExecutiveDashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { 
      id: 1, x: 1, y: 1, w: 3, h: 2, title: "Q3_REVENUE", 
      icon: <DollarSign size={14}/>, type: 'metric', 
      data: { value: "$124.5M", trend: "+14.2% YoY", positive: true } 
    },
    { 
      id: 2, x: 4, y: 1, w: 2, h: 2, title: "ACTIVE_CLIENTS", 
      icon: <Users size={14}/>, type: 'metric', 
      data: { value: "8,432", trend: "+5.1%", positive: true } 
    },
    { 
      id: 3, x: 1, y: 3, w: 3, h: 3, title: "MARKET_SHARE", 
      icon: <BarChart3 size={14}/>, type: 'chart' 
    },
    { 
      id: 4, x: 4, y: 3, w: 3, h: 2, title: "GLOBAL_INFRA", 
      icon: <Globe size={14}/>, type: 'status',
      data: { value: "99.99%", trend: "STABLE", positive: true } 
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  // --- ДВИЖОК КОЛЛИЗИЙ (Без изменений) ---
  const canPlaceWidget = (id: number, nx: number, ny: number, nw: number, nh: number, currentWidgets: Widget[]): boolean => {
    if (nx < 1 || ny < 1 || nx + nw - 1 > 6 || ny + nh - 1 > 6) return false;
    if (nw < 1 || nh < 1) return false;
    for (const other of currentWidgets) {
      if (other.id === id) continue;
      const overlapX = nx < other.x + other.w && nx + nw > other.x;
      const overlapY = ny < other.y + other.h && ny + nh > other.y;
      if (overlapX && overlapY) return false;
    }
    return true; 
  };

  // --- ЛОГИКА РЕСАЙЗА (Без изменений) ---
  const startResizing = (id: number, dir: ResizeDirection, startEvent: React.MouseEvent) => {
    startEvent.preventDefault();
    startEvent.stopPropagation();

    const startX = startEvent.clientX;
    const startY = startEvent.clientY;
    const initialWidgets = [...widgets];
    const wgt = initialWidgets.find(w => w.id === id)!;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cellW = containerRef.current.offsetWidth / 6;
      const cellH = containerRef.current.offsetHeight / 6;

      const dx = Math.round((e.clientX - startX) / cellW);
      const dy = Math.round((e.clientY - startY) / cellH);

      let nextX = wgt.x, nextY = wgt.y, nextW = wgt.w, nextH = wgt.h;

      if (dir.includes('e')) nextW = wgt.w + dx;
      if (dir.includes('w')) { nextX = wgt.x + dx; nextW = wgt.w - dx; }
      if (dir.includes('s')) nextH = wgt.h + dy;
      if (dir.includes('n')) { nextY = wgt.y + dy; nextH = wgt.h - dy; }

      if (canPlaceWidget(id, nextX, nextY, nextW, nextH, initialWidgets)) {
        setWidgets(prev => prev.map(w => 
          w.id === id ? { ...w, x: nextX, y: nextY, w: nextW, h: nextH } : w
        ));
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // --- ЛОГИКА ДРАГА (Без изменений) ---
  const startDragging = (id: number, startEvent: React.MouseEvent) => {
    if ((startEvent.target as HTMLElement).classList.contains('resize-handle')) return;

    startEvent.preventDefault();
    const startX = startEvent.clientX;
    const startY = startEvent.clientY;
    const initialWidgets = [...widgets];
    const wgt = initialWidgets.find(w => w.id === id)!;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cellW = containerRef.current.offsetWidth / 6;
      const cellH = containerRef.current.offsetHeight / 6;

      const dx = Math.round((e.clientX - startX) / cellW);
      const dy = Math.round((e.clientY - startY) / cellH);

      const nextX = wgt.x + dx;
      const nextY = wgt.y + dy;

      if (canPlaceWidget(id, nextX, nextY, wgt.w, wgt.h, initialWidgets)) {
        setWidgets(prev => prev.map(w => 
          w.id === id ? { ...w, x: nextX, y: nextY } : w
        ));
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // --- КОМПОНЕНТЫ НАПОЛНЕНИЯ ВИДЖЕТОВ ---
  const renderWidgetContent = (w: Widget) => {
    if (w.type === 'metric') {
      return (
        <div className="flex flex-col justify-center h-full">
          <div className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-600 tracking-tighter">
            {w.data?.value}
          </div>
          {w.data?.trend && (
            <div className="text-[8px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-2 text-emerald-500">
              {w.data.trend}
            </div>
          )}
        </div>
      );
    }
    if (w.type === 'status') {
      return (
        <div className="flex items-center gap-2 md:gap-4 h-full">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-amber-500/30 flex items-center justify-center relative">
             <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-amber-500/50 border-t-amber-500 animate-spin" />
             <Activity size={20} className="absolute text-amber-500" />
          </div>
          <div>
            <div className="text-lg md:text-2xl font-bold text-zinc-200">{w.data?.value}</div>
            <div className="text-[8px] md:text-[10px] text-amber-500/70 tracking-widest uppercase">{w.data?.trend}</div>
          </div>
        </div>
      );
    }
    if (w.type === 'chart') {
      return (
        <div className="flex items-end gap-1 md:gap-2 h-full w-full pt-2 md:pt-4">
          {[40, 70, 45, 90, 65, 80].map((h, i) => (
            <div key={i} className="flex-grow bg-gradient-to-t from-amber-600/10 to-amber-500/80 rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="h-screen w-full bg-[#020202] text-zinc-500 font-mono p-2 md:p-4 flex flex-col select-none overflow-hidden">
      
      {/* EXECUTIVE HEADER */}
      <div className="flex justify-between items-center mb-3 md:mb-6 border-b border-zinc-900 pb-2 md:pb-4 px-1 md:px-2">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-6 h-6 md:w-8 md:h-8 border border-amber-500/30 bg-amber-500/10 flex items-center justify-center rounded">
            <DollarSign size={16} className="text-amber-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-100 font-bold tracking-[0.2em] text-xs md:text-sm">EXECUTIVE_BOARD</span>
            <span className="text-amber-500/70 text-[8px] md:text-[9px] uppercase tracking-widest">Financial Overview Q3</span>
          </div>
        </div>
        <div className="flex gap-3 md:gap-6 text-[8px] md:text-[10px] uppercase tracking-wider text-zinc-600">
            <span>Market: <span className="text-emerald-500">BULLISH</span></span>
            <span>Grid: 6x6 LOCKED</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div 
        ref={containerRef}
        className="flex-grow grid grid-cols-6 grid-rows-6 gap-2 md:gap-3 relative"
        style={{ gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}
      >
        {/* BACKGROUND DOTS (Gold tinted) */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 md:gap-3 pointer-events-none opacity-20">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-amber-900/20 rounded-lg bg-[#050505]" />
          ))}
        </div>

        {/* WIDGETS */}
        {widgets.map((w) => (
          <div
            key={w.id}
            onMouseDown={(e) => startDragging(w.id, e)}
            style={{ 
              gridColumn: `${w.x} / span ${w.w}`,
              gridRow: `${w.y} / span ${w.h}`,
            }}
            className="group relative bg-[#080808] border border-zinc-800 rounded-lg md:rounded-xl p-3 md:p-5 flex flex-col cursor-grab active:cursor-grabbing hover:border-amber-500/40 transition-all shadow-2xl"
          >
            {/* WIDGET HEADER */}
            <div className="flex justify-between items-start mb-2 md:mb-4 text-[8px] md:text-[10px] font-bold tracking-widest text-zinc-600">
              <div className="flex items-center gap-1 md:gap-2 group-hover:text-amber-500 transition-colors">
                {w.icon}
                <span>{w.title}</span>
              </div>
              <span className="opacity-30">[{w.w}x{w.h}]</span>
            </div>

            {/* WIDGET CONTENT */}
            <div className="flex-grow">
               {renderWidgetContent(w)}
            </div>

            {/* --- 8 РУЧЕК РЕСАЙЗА (Золотые) --- */}
            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 'n', e)} className="top-0 left-1/4 right-1/4 h-1 md:h-1.5 cursor-ns-resize" />
            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 's', e)} className="bottom-0 left-1/4 right-1/4 h-1 md:h-1.5 cursor-ns-resize" />
            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 'e', e)} className="right-0 top-1/4 bottom-1/4 w-1 md:w-1.5 cursor-ew-resize" />
            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 'w', e)} className="left-0 top-1/4 bottom-1/4 w-1 md:w-1.5 cursor-ew-resize" />

            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 'nw', e)} className="top-0 left-0 w-2 h-2 md:w-3 md:h-3 cursor-nwse-resize rounded-tl-xl" />
            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 'ne', e)} className="top-0 right-0 w-2 h-2 md:w-3 md:h-3 cursor-nesw-resize rounded-tr-xl" />
            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 'sw', e)} className="bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 cursor-nesw-resize rounded-bl-xl" />
            <ResizeHandle onMouseDown={(e) => startResizing(w.id, 'se', e)} className="bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 cursor-nwse-resize rounded-br-xl" />

          </div>
        ))}
      </div>
    </div>
  );
}

// Золотые ручки ресайза
function ResizeHandle({ onMouseDown, className }: { onMouseDown: (e: any) => void, className: string }) {
    return (
        <div 
            onMouseDown={onMouseDown}
            className={`resize-handle absolute z-10 opacity-0 group-hover:opacity-100 bg-amber-500/20 hover:bg-amber-500 transition-all ${className}`}
        />
    );
}