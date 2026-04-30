"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SonyBiome() {
  const colors = [
    { 
      name: "Sand Pink", 
      hex: "#b49a94", 
      accent: "#e5d1cd", // Нежно-розовый для букв
      modelCode: "PME",
      price: "42 990 ₽",
      tagline: "Эстетика в каждом звуке.",
      img: "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_16_M?$productIntroPlatemobile$&fmt=png-alpha"
    },
    { 
      name: "Midnight Blue", 
      hex: "#1a1e4b", 
      accent: "#6497d6", // Голубовато-стальной
      modelCode: "LME",
      price: "39 990 ₽",
      tagline: "Глубина ночного неба.",
      img: "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_12_M?$productIntroPlatemobile$&fmt=png-alpha"
    },
    { 
      name: "Black", 
      hex: "#222222", 
      accent: "#2e2e33", // Темно-серый (zinc-600)
      modelCode: "BME",
      price: "38 990 ₽",
      tagline: "Классика вне времени.",
      img: "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_01_M?$productIntroPlatemobile$&fmt=png-alpha"
    },
    { 
      name: "Platinum Silver", 
      hex: "#d8d3cd", 
      accent: "#e4e4e7", // Светло-серый (zinc-200)
      modelCode: "SME",
      price: "39 990 ₽",
      tagline: "Технологии в чистом виде.",
      img: "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_08_M?$productIntroPlatemobile$&fmt=png-alpha"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-full w-full bg-white text-black flex items-center justify-center p-4 md:p-20 overflow-hidden relative">
      
      {/* ФОНОВЫЙ ЛОГОТИП */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[25vw] font-black text-zinc-100 select-none pointer-events-none z-0">
        SONY
      </div>

      <div className="max-w-[1400px] w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 z-10">
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="w-full md:w-[45%] space-y-6 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="h-[1px] w-6 md:w-8 bg-blue-600"></span>
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-blue-600 uppercase">New Era of Silence</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.8]">
              WH-1000<br/>
              {/* Анимированные буквы XM6 */}
              <motion.span 
                animate={{ color: colors[activeIndex].accent }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                XM6
              </motion.span>
            </h1>

            <div className="min-h-[100px] md:min-h-[160px] flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2 md:space-y-3"
                >
                  <p className="text-lg md:text-2xl font-medium text-zinc-900">{colors[activeIndex].tagline}</p>
                  <p className="text-sm md:text-lg text-zinc-500 font-light max-w-sm leading-relaxed">
                    Адаптивное шумоподавление на базе AI и 70 часов автономной работы. 
                    Будущее звука уже здесь.
                  </p>
                  <p className="text-3xl md:text-5xl font-light text-zinc-900 pt-2 md:pt-4">{colors[activeIndex].price}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ВЫБОР ЦВЕТА */}
          <div className="bg-white/50 backdrop-blur-md p-4 md:p-6 rounded-[30px] md:rounded-[40px] border border-zinc-100 shadow-xl shadow-zinc-200/50 inline-block">
            <div className="flex gap-3 md:gap-4">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    group relative w-10 h-10 md:w-14 md:h-14 rounded-full transition-all duration-500
                    ${activeIndex === index ? "scale-110 ring-2 ring-offset-2 md:ring-offset-4 ring-zinc-300" : "hover:scale-105"}
                  `}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-inner border border-black/5" 
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pt-2 md:pt-4">
            <button className="w-full md:w-auto bg-black text-white px-8 md:px-14 py-4 md:py-6 rounded-full font-bold text-base md:text-lg hover:bg-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all active:scale-95">
              Оформить заказ
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Model Code</span>
              <span className="text-zinc-900 font-mono font-bold tracking-tight">XM6-{colors[activeIndex].modelCode}</span>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="w-full md:w-[55%] relative flex items-center justify-center mt-4 md:mt-0">
          <div className="relative w-full aspect-square flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={colors[activeIndex].img}
                alt={colors[activeIndex].name}
                initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, x: -100, scale: 0.8, rotate: -10 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] select-none pointer-events-none"
              />
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}