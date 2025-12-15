import React from 'react';
import { useTeamData } from '../context/TeamContext';
import { Logo } from './Logo';
import { Trophy, Users, MapPin } from 'lucide-react';

export const Hero = () => {
  const { teamPhoto } = useTeamData();

  return (
    <div className="relative bg-fp-dark overflow-hidden border-b-4 border-fp-orange">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-fp-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <Logo className="w-40 h-40 sm:w-52 sm:h-52 drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]" />
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-display font-bold text-white uppercase tracking-wider mb-2">
          Frutas <span className="text-fp-orange">Plasencia</span> FC
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-gray-300 mb-8 font-sans font-medium">
          <div className="flex items-center gap-2 bg-fp-gray px-4 py-2 rounded-full border border-gray-700">
            <Trophy size={18} className="text-fp-orange" />
            <span>2ª División Liga Estoril</span>
          </div>
          <div className="flex items-center gap-2 bg-fp-gray px-4 py-2 rounded-full border border-gray-700">
            <Users size={18} className="text-fp-orange" />
            <span>Club Deportivo Estoril</span>
          </div>
          <div className="flex items-center gap-2 bg-fp-gray px-4 py-2 rounded-full border border-gray-700">
             <span className="text-xl">🍊</span>
             <span>NARANJA MECÁNICA</span>
          </div>
        </div>

        <p className="max-w-2xl text-gray-400 text-lg mb-12">
          Pasión, fruta y buen fútbol. El equipo revelación que domina la cancha con vitamina C.
        </p>

        {/* TEAM PHOTO SECTION */}
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden border-4 border-fp-orange shadow-[0_0_50px_rgba(255,107,0,0.3)] relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
          
          <img 
            src={teamPhoto} 
            alt="Frutas Plasencia FC Plantilla Oficial" 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out min-h-[300px]"
          />
          
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex justify-between items-end">
             <div className="text-left">
                <span className="bg-fp-orange text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest mb-2 inline-block">Temporada 25/26</span>
                <h3 className="text-3xl font-display font-bold text-white uppercase leading-none drop-shadow-lg">La Familia</h3>
             </div>
             <div className="hidden md:block">
               <Logo className="w-16 h-16 opacity-80" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};