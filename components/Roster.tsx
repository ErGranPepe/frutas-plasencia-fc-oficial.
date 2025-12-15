import React, { useState } from 'react';
import { useTeamData } from '../context/TeamContext';
import { Player } from '../types';
import { User, Briefcase, Calendar, Sparkles, X, ChevronRight, Eye } from 'lucide-react';

export const Roster = () => {
  const { roster } = useTeamData();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Maintain original roster order or specific logic, but ensure we render EVERYONE
  const displayRoster = [...roster]; 

  return (
    <section id="plantilla" className="py-24 bg-[#0a0a0a] scroll-mt-20 relative overflow-hidden">
      {/* Background Tech Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FF6B00 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="relative">
             <h2 className="text-5xl md:text-6xl font-display font-bold text-white uppercase italic tracking-tighter z-10 relative">
               Plantilla <span className="text-fp-orange">25/26</span>
             </h2>
             <div className="absolute -bottom-2 left-0 w-full h-2 bg-fp-orange skew-x-12"></div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
             <span className="text-fp-orange font-bold text-2xl font-display">{roster.length}</span>
             <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Jugadores Inscritos</span>
          </div>
        </div>

        {/* UNIFIED GRID: High density, powerful visuals */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayRoster.map((player, idx) => (
            <PlayerCard 
              key={player.id || idx} 
              player={player} 
              onClick={() => setSelectedPlayer(player)}
            />
          ))}
        </div>
      </div>

      {/* MODAL DETALLES */}
      {selectedPlayer && (
        <PlayerModal 
          player={selectedPlayer} 
          onClose={() => setSelectedPlayer(null)} 
        />
      )}
    </section>
  );
};

// Carta Potente (Estilo Ultimate Team / Gamer)
const PlayerCard: React.FC<{ player: Player; onClick: () => void }> = ({ player, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative h-[360px] bg-neutral-900 rounded-lg overflow-hidden cursor-pointer border border-gray-800 hover:border-fp-orange transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,107,0,0.3)] flex flex-col"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-900 to-gray-900 z-0"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-fp-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-fp-orange/20 transition-colors"></div>

      {/* Big Number (The one from constants) */}
      <div className="absolute top-2 left-3 z-10 flex flex-col items-center">
        <span className="text-4xl font-display font-bold text-white leading-none drop-shadow-md">
          {player.number}
        </span>
        <div className="w-8 h-1 bg-fp-orange mt-1"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-4">
        
        {/* Position Badge */}
        <div className="flex justify-end mb-4">
           <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${
             player.position === 'POR' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
             player.position === 'DEF' ? 'border-blue-500/50 text-blue-500 bg-blue-500/10' :
             player.position === 'MED' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
             'border-red-500/50 text-red-500 bg-red-500/10'
           }`}>
             {player.position}
           </span>
        </div>

        {/* Avatar Area */}
        <div className="flex-grow flex items-center justify-center relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-gray-700 group-hover:border-fp-orange group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xl z-10 overflow-hidden">
            {player.photo ? (
               <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
            ) : (
               <User size={48} className="text-gray-500 group-hover:text-white transition-colors" />
            )}
          </div>
          {/* Circular progress aesthetic behind */}
          <svg className="absolute w-36 h-36 rotate-[-90deg] opacity-20 group-hover:opacity-50 transition-opacity" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="283" strokeDashoffset="100" className="text-fp-orange" />
          </svg>
        </div>

        {/* Name Info */}
        <div className="text-center mt-4">
          <h3 className="text-2xl font-display font-bold text-white uppercase leading-none mb-1 truncate px-1 group-hover:text-fp-orange transition-colors">
            {player.nickname || player.name}
          </h3>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] truncate">
            {player.name}
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente Modal Mejorado
const PlayerModal: React.FC<{ player: Player; onClose: () => void }> = ({ player, onClose }) => {
  const getStatColor = (val: number) => {
    if (val >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-400';
    if (val >= 80) return 'bg-gradient-to-r from-blue-500 to-cyan-400';
    if (val >= 70) return 'bg-gradient-to-r from-yellow-500 to-orange-400';
    return 'bg-gradient-to-r from-red-500 to-rose-400';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#111] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl border border-fp-orange/30 shadow-[0_0_100px_rgba(255,107,0,0.2)] animate-fade-in-up flex flex-col md:flex-row overflow-hidden">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-fp-orange rounded-full text-white transition-colors border border-white/10"
        >
          <X size={24} />
        </button>

        {/* Left Card Visual */}
        <div className="md:w-5/12 bg-gradient-to-br from-fp-gray to-black relative flex flex-col items-center justify-center p-10 border-r border-white/5">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           
           {/* Background big number */}
           <span className="text-[200px] font-display font-bold text-white/5 absolute top-0 leading-none select-none z-0">
             {player.number}
           </span>

           <div className="relative z-10 mb-6">
              <div className="w-48 h-48 rounded-full bg-neutral-800 border-4 border-white/10 shadow-2xl flex items-center justify-center overflow-hidden relative">
                 {player.photo ? (
                    <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                 ) : (
                    <User size={80} className="text-gray-600" />
                 )}
              </div>
              
              {/* FIXED: Removed OVR, now shows Jersey Number only */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-fp-orange text-white font-display text-4xl font-bold px-5 py-0 rounded-lg shadow-lg border-2 border-white/10 skew-x-[-10deg]">
                 <span className="skew-x-[10deg] inline-block">#{player.number}</span>
              </div>
           </div>

           <h2 className="text-5xl font-display font-bold text-white uppercase text-center relative z-10 leading-none mb-2 mt-4">
             {player.nickname || player.name}
           </h2>
           <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs z-10">{player.name}</span>
        </div>

        {/* Right Details */}
        <div className="md:w-7/12 p-8 md:p-12 bg-[#0a0a0a]">
           
           <div className="flex gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-lg flex-1 border border-white/5">
                 <div className="text-fp-orange mb-1"><Calendar size={18} /></div>
                 <div className="text-xs text-gray-500 uppercase font-bold">Edad</div>
                 <div className="text-xl text-white font-bold font-display">{player.age}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg flex-[2] border border-white/5">
                 <div className="text-fp-orange mb-1"><Briefcase size={18} /></div>
                 <div className="text-xs text-gray-500 uppercase font-bold">Vida Real</div>
                 <div className="text-xl text-white font-bold font-display truncate">{player.job}</div>
              </div>
           </div>

           <div className="mb-10">
              <h3 className="text-fp-orange font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                <Sparkles size={12} /> Informe Técnico
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light border-l-2 border-fp-orange pl-4">
                {player.bio}
              </p>
           </div>

           <div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                 <StatRow label="RIT" value={player.stats.ritmo} color={getStatColor(player.stats.ritmo)} />
                 <StatRow label="TIR" value={player.stats.tiro} color={getStatColor(player.stats.tiro)} />
                 <StatRow label="PAS" value={player.stats.pase} color={getStatColor(player.stats.pase)} />
                 <StatRow label="REG" value={player.stats.regate} color={getStatColor(player.stats.regate)} />
                 <StatRow label="DEF" value={player.stats.defensa} color={getStatColor(player.stats.defensa)} />
                 <StatRow label="FIS" value={player.stats.fisico} color={getStatColor(player.stats.fisico)} />
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="flex items-center gap-4 group">
    <span className="text-gray-500 font-bold font-display text-xl w-8 group-hover:text-white transition-colors">{label}</span>
    <div className="flex-grow h-3 bg-gray-800 rounded-full overflow-hidden relative">
      <div 
        className={`h-full ${color} shadow-[0_0_10px_currentColor]`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
    <span className="font-bold text-white font-display text-2xl w-8 text-right">{value}</span>
  </div>
);