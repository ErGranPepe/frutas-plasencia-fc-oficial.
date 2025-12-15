import React from 'react';
import { useTeamData } from '../context/TeamContext';
import { Megaphone, AlertCircle, Calendar, ShieldAlert } from 'lucide-react';

export const NewsBoard = () => {
  const { news } = useTeamData();

  if (news.length === 0) return null;

  return (
    <section id="noticias" className="py-12 bg-fp-dark border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
           <Megaphone className="text-fp-orange animate-bounce" size={32} />
           <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">
             Comunicados Oficiales
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-neutral-900 border-l-4 border-fp-orange rounded-r-lg p-6 shadow-lg relative overflow-hidden group hover:bg-neutral-800 transition-colors">
               <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.type === 'lesion' ? 'bg-red-500/20 text-red-500' :
                    item.type === 'fichaje' ? 'bg-green-500/20 text-green-500' :
                    item.type === 'partido' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {item.type === 'lesion' ? 'Parte Médico' : item.type}
                  </span>
                  <span className="text-gray-500 text-xs">{item.date}</span>
               </div>
               
               <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed">{item.content}</p>

               {/* Icon Overlay */}
               <div className="absolute -bottom-4 -right-4 text-white/5 rotate-12 group-hover:scale-110 transition-transform">
                 {item.type === 'lesion' ? <ShieldAlert size={80} /> : <AlertCircle size={80} />}
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};