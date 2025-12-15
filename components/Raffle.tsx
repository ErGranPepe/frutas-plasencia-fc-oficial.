import React, { useState } from 'react';
import { ROSTER } from '../constants';
import { Gift, Sparkles, Send } from 'lucide-react';

export const Raffle = () => {
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    player: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.instagram && formData.player) {
      setSubmitted(true);
      // Here you would typically send data to a backend
    }
  };

  return (
    <section id="sorteo" className="py-24 relative overflow-hidden bg-neutral-900 scroll-mt-20">
      {/* Gold/Luxury Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-fp-orange/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            <Gift size={16} />
            <span>Sorteo Exclusivo</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-none">
            CONOCE A TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-fp-orange">ÍDOLO</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            ¿Sueñas con que <strong>{formData.player || 'SP'}</strong> te firme la camiseta o te invite a un kebab? 
            Rellena el formulario y participa en el sorteo del año.
          </p>
          <div className="mt-8 text-fp-orange font-bold text-xl uppercase tracking-widest border-y border-gray-800 py-3 inline-block">
            📅 Fecha del Sorteo: 1 de Enero
          </div>
        </div>

        {submitted ? (
          <div className="bg-fp-gray border-2 border-yellow-500/50 rounded-2xl p-12 text-center shadow-[0_0_50px_rgba(234,179,8,0.2)] animate-pulse">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black shadow-lg">
              <Sparkles size={48} />
            </div>
            <h3 className="text-4xl font-display font-bold text-white mb-4">¡PARTICIPACIÓN ENVIADA!</h3>
            <p className="text-gray-300 text-lg">
              Mucha suerte, <strong>{formData.name}</strong>. Ve preparando el outfit por si ganas.
              <br/>
              <span className="text-sm text-gray-500 mt-6 block">(No olvides seguirnos en Instagram para ver si ganas)</span>
            </p>
            <button 
              onClick={() => { setSubmitted(false); setFormData({name: '', instagram: '', player: ''})}}
              className="mt-8 text-fp-orange hover:text-white underline text-sm tracking-wide"
            >
              Enviar otra participación (Tramposo)
            </button>
          </div>
        ) : (
          <div className="bg-fp-gray/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Tu Nombre</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Ej: Manolo el del Bombo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-neutral-900 border border-gray-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-fp-orange focus:border-transparent outline-none transition-all placeholder-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Instagram (@)</label>
                  <input
                    type="text"
                    id="instagram"
                    required
                    placeholder="@usuario"
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    className="w-full bg-neutral-900 border border-gray-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-fp-orange focus:border-transparent outline-none transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="player" className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">¿A quién quieres conocer?</label>
                <div className="relative">
                  <select
                    id="player"
                    required
                    value={formData.player}
                    onChange={(e) => setFormData({...formData, player: e.target.value})}
                    className="w-full bg-neutral-900 border border-gray-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-fp-orange focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Selecciona a tu ídolo...</option>
                    {ROSTER.map(player => (
                      <option key={player.number} value={player.name}>
                        #{player.number} - {player.name} ({player.position})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-fp-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-5 rounded-xl transform hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-xl uppercase tracking-widest"
              >
                <Send size={24} />
                Quiero Ganar
              </button>
              
              <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-wider">
                *Al participar aceptas invitar a una ronda si ganas. Bases legales no disponibles.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};