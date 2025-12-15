import React, { useState } from 'react';
import { useTeamData } from '../context/TeamContext';
import { Logo } from './Logo';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export const Matches = () => {
  const { matches, nextMatch } = useTeamData();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <section id="partidos" className="py-20 bg-fp-dark border-y border-gray-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Next Match Banner */}
        <div className="mb-20">
           <h2 className="text-2xl font-display font-bold text-white mb-8 uppercase tracking-wider text-center">Próximo Encuentro</h2>
           <div className="bg-gradient-to-r from-fp-gray to-neutral-900 rounded-2xl p-6 md:p-10 border border-fp-orange shadow-[0_0_20px_rgba(255,107,0,0.15)] max-w-4xl mx-auto relative overflow-hidden group hover:shadow-[0_0_30px_rgba(255,107,0,0.25)] transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-fp-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-3 md:w-1/3">
                   <div className="transform transition-transform group-hover:scale-110 duration-300">
                      <Logo className="w-24 h-24 md:w-28 md:h-28" />
                   </div>
                   <span className="font-display text-2xl font-bold text-center leading-none">FRUTAS PLASENCIA</span>
                </div>

                {/* VS Info */}
                <div className="flex flex-col items-center text-center md:w-1/3 z-10">
                   <span className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4">VS</span>
                   <div className="flex flex-col gap-3 w-full max-w-[200px]">
                      <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg">
                        <Calendar size={16} className="text-fp-orange"/> 
                        <span className="text-sm font-bold text-gray-200">{nextMatch.date}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg">
                        <Clock size={16} className="text-fp-orange"/> 
                        <span className="text-sm font-bold text-gray-200">{nextMatch.time}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg">
                        <MapPin size={16} className="text-fp-orange"/> 
                        <span className="text-sm font-bold text-gray-200">{nextMatch.location}</span>
                      </div>
                   </div>
                </div>

                {/* Away Team (Placeholder) */}
                <div className="flex flex-col items-center gap-3 md:w-1/3 opacity-80">
                   <div className="w-24 h-24 md:w-28 md:h-28 bg-neutral-800 rounded-full border-4 border-gray-700 flex items-center justify-center text-4xl shadow-lg">
                     🛡️
                   </div>
                   <span className="font-display text-2xl font-bold text-gray-400 text-center leading-none">{nextMatch.opponent}</span>
                </div>
              </div>
           </div>
        </div>

        {/* Collapsible Recent Matches */}
        <div className="text-center md:text-left">
           <button 
             onClick={() => setShowHistory(!showHistory)}
             className="group flex items-center gap-4 text-4xl font-display font-bold text-white uppercase mb-8 mx-auto md:mx-0 hover:text-fp-orange transition-colors"
           >
             <span className="border-l-4 border-fp-orange pl-4">Últimos Resultados</span>
             {showHistory ? <ChevronUp className="text-gray-500 group-hover:text-fp-orange"/> : <ChevronDown className="text-gray-500 group-hover:text-fp-orange"/>}
           </button>
        </div>

        {showHistory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {matches.map((match, index) => (
              <div key={match.id || index} className="bg-fp-gray rounded-xl p-6 border border-gray-800 flex flex-col items-center hover:border-gray-600 transition-colors shadow-lg">
                <div className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 bg-black/30 px-3 py-1 rounded-full">
                  Liga Estoril 25/26
                </div>
                
                <div className="flex items-center justify-between w-full mb-2">
                  {/* Us */}
                  <div className="flex flex-col items-center w-1/3">
                    <div className="w-14 h-14 mb-2">
                      <Logo className="w-full h-full" />
                    </div>
                    <span className="text-xs font-bold text-fp-orange tracking-wider">FRUTAS P.</span>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center w-1/3 relative">
                    <div className="text-5xl font-display font-bold text-white tracking-widest">
                      {match.ourScore}-{match.theirScore}
                    </div>
                    <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase mt-2 shadow-lg ${
                      match.result === 'W' ? 'bg-green-600 text-white' : 
                      match.result === 'L' ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {match.result === 'W' ? 'Victoria' : match.result === 'L' ? 'Derrota' : 'Empate'}
                    </span>
                  </div>

                  {/* Opponent (Generic Shield Icon) */}
                  <div className="flex flex-col items-center w-1/3 grayscale opacity-70">
                    <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-2 text-2xl border-2 border-gray-600">
                      ⚽
                    </div>
                    <span className="text-xs font-bold text-gray-400 text-center leading-tight">{match.opponent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};