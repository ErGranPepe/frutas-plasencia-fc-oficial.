import React from 'react';
import { TROPHIES } from '../constants';

export const Trophies = () => {
  return (
    <section id="palmares" className="py-20 bg-black relative border-y border-gray-900 scroll-mt-20 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-fp-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 uppercase tracking-tighter mb-4">
            Sala de Trofeos
          </h2>
          <div className="w-24 h-1 bg-fp-orange mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {TROPHIES.map((trophy) => (
            <div key={trophy.id} className="group flex flex-col items-center text-center max-w-[250px]">
              {/* Realistic Cup Render */}
              <div className="relative w-48 h-48 mb-8 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <RealisticCup type={trophy.type} />
                
                {/* Glow Effect under cup */}
                <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-10 rounded-full blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-80
                   ${trophy.type === 'gold' ? 'bg-yellow-500' : trophy.type === 'silver' ? 'bg-gray-300' : 'bg-orange-700'}`} 
                />
              </div>

              {/* Text Content */}
              <div>
                 <span className={`text-6xl font-display font-bold opacity-20 absolute -z-10 top-20 left-1/2 -translate-x-1/2 select-none
                    ${trophy.type === 'gold' ? 'text-yellow-500' : trophy.type === 'silver' ? 'text-gray-400' : 'text-orange-900'}`}>
                   {trophy.year}
                 </span>
                 <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">{trophy.title}</h3>
                 <p className="text-fp-orange font-bold text-sm mb-2">{trophy.year}</p>
                 <p className="text-gray-400 text-sm leading-relaxed">{trophy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RealisticCup = ({ type }: { type: 'gold' | 'silver' | 'bronze' }) => {
  const colors = {
    gold: {
      light: '#FFD700',
      main: '#DAA520',
      dark: '#B8860B',
      shine: '#FFF8DC'
    },
    silver: {
      light: '#E0E0E0',
      main: '#C0C0C0',
      dark: '#A9A9A9',
      shine: '#F5F5F5'
    },
    bronze: {
      light: '#FFA07A',
      main: '#CD7F32',
      dark: '#8B4513',
      shine: '#FFDAB9'
    }
  };

  const c = colors[type];

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.dark} />
          <stop offset="20%" stopColor={c.main} />
          <stop offset="40%" stopColor={c.light} />
          <stop offset="50%" stopColor={c.shine} />
          <stop offset="60%" stopColor={c.light} />
          <stop offset="80%" stopColor={c.main} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
        <radialGradient id={`shine-${type}`} cx="50%" cy="20%" r="50%" fx="50%" fy="20%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor={c.main} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base */}
      <path d="M70 170 L130 170 L140 190 L60 190 Z" fill={`url(#grad-${type})`} />
      <rect x="65" y="160" width="70" height="10" fill={c.dark} />

      {/* Cup Body */}
      <path d="M50 40 Q50 140 100 160 Q150 140 150 40 Z" fill={`url(#grad-${type})`} />
      
      {/* Top Ellipse (Opening) */}
      <ellipse cx="100" cy="40" rx="50" ry="10" fill={c.dark} />
      <ellipse cx="100" cy="40" rx="45" ry="8" fill={c.dark} opacity="0.5" />
      
      {/* Handles */}
      <path d="M50 50 C20 50 20 100 50 110" fill="none" stroke={`url(#grad-${type})`} strokeWidth="8" strokeLinecap="round" />
      <path d="M150 50 C180 50 180 100 150 110" fill="none" stroke={`url(#grad-${type})`} strokeWidth="8" strokeLinecap="round" />

      {/* Shine Highlight */}
      <path d="M65 50 Q65 130 90 145" fill="none" stroke="white" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
};
