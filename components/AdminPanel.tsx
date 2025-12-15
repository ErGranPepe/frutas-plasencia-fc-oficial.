import React, { useState, useRef } from 'react';
import { useTeamData } from '../context/TeamContext';
import { Lock, Save, Trash, Plus, UserCog, CalendarCheck, Megaphone, Settings, Image as ImageIcon, UserPlus, Upload, Edit2, Check, X } from 'lucide-react';
import { Player, MatchResult } from '../types';

export const AdminPanel = ({ onClose }: { onClose: () => void }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [password, setPassword] = useState('');
   const [activeTab, setActiveTab] = useState<'matches' | 'roster' | 'news' | 'club'>('matches');

   // State for Editing Matches
   const [editingMatchId, setEditingMatchId] = useState<string | null>(null);

   const {
      roster, updatePlayer, addPlayer, deletePlayer,
      nextMatch, updateNextMatch,
      matches, addMatch, editMatch, deleteMatch,
      news, addNews, deleteNews,
      teamPhoto, updateTeamPhoto
   } = useTeamData();

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === 'frutas123') {
         setIsAuthenticated(true);
      } else {
         alert('Contraseña incorrecta, capi.');
      }
   };

   // --- FILE UPLOAD HELPER ---
   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            // This converts the image to a Base64 string
            callback(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleCreatePlayer = () => {
      const newPlayer: Player = {
         id: Date.now().toString(),
         number: 0,
         name: 'Nuevo Jugador',
         position: 'MED',
         photo: '',
         age: 18,
         job: 'Estudiante',
         bio: 'Descripción pendiente...',
         tags: [],
         stats: { ritmo: 60, tiro: 60, pase: 60, regate: 60, defensa: 60, fisico: 60 }
      };
      addPlayer(newPlayer);
      // Auto-open the new player (logic would be to set open state, but we use simple details/summary)
      alert('Jugador creado al final de la lista. ¡Edítalo!');
   };

   if (!isAuthenticated) {
      return (
         <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-gray-800 p-8 rounded-2xl max-w-md w-full text-center">
               <div className="w-16 h-16 bg-fp-orange/20 text-fp-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock size={32} />
               </div>
               <h2 className="text-2xl font-display font-bold text-white mb-2">Zona Capitán</h2>
               <p className="text-gray-400 text-sm mb-6">Introduce la clave para editar la web.</p>

               <form onSubmit={handleLogin} className="space-y-4">
                  <input
                     type="password"
                     placeholder="Contraseña"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-fp-orange outline-none"
                  />
                  <div className="flex gap-2">
                     <button type="button" onClick={onClose} className="flex-1 py-3 text-gray-400 hover:text-white text-sm font-bold">Cancelar</button>
                     <button type="submit" className="flex-1 bg-fp-orange hover:bg-orange-600 text-white rounded-lg py-3 font-bold transition-colors">Entrar</button>
                  </div>
               </form>
            </div>
         </div>
      );
   }

   return (
      <div className="fixed inset-0 z-[60] bg-neutral-900 overflow-y-auto">
         <div className="sticky top-0 bg-neutral-900 border-b border-gray-800 p-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
               <UserCog className="text-fp-orange" /> Panel de Control
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white font-bold">Salir</button>
         </div>

         <div className="max-w-5xl mx-auto p-4">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
               <button
                  onClick={() => setActiveTab('matches')}
                  className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'matches' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}
               >
                  <CalendarCheck size={16} /> Partidos
               </button>
               <button
                  onClick={() => setActiveTab('roster')}
                  className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'roster' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}
               >
                  <UserCog size={16} /> Jugadores
               </button>
               <button
                  onClick={() => setActiveTab('news')}
                  className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'news' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}
               >
                  <Megaphone size={16} /> Noticias
               </button>
               <button
                  onClick={() => setActiveTab('club')}
                  className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'club' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}
               >
                  <Settings size={16} /> Club
               </button>
            </div>

            {/* CONTENT: Matches */}
            {activeTab === 'matches' && (
               <div className="space-y-8 animate-fade-in-up">
                  {/* Next Match */}
                  <div className="bg-black border border-gray-800 p-6 rounded-xl">
                     <h3 className="text-fp-orange font-bold uppercase mb-4 flex items-center gap-2">
                        <CalendarCheck size={20} /> Gestión Próximo Partido
                     </h3>
                     <p className="text-xs text-gray-500 mb-4">Edita aquí para actualizar el cartel de la portada.</p>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Equipo Rival</label>
                           <input
                              className="admin-input w-full"
                              placeholder="Ej: Atlético Barril"
                              value={nextMatch.opponent}
                              onChange={(e) => updateNextMatch({ ...nextMatch, opponent: e.target.value })}
                           />
                        </div>
                        <div>
                           <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Fecha</label>
                           <input
                              className="admin-input w-full"
                              placeholder="Ej: Sábado 12"
                              value={nextMatch.date}
                              onChange={(e) => updateNextMatch({ ...nextMatch, date: e.target.value })}
                           />
                        </div>
                        <div>
                           <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Hora</label>
                           <input
                              className="admin-input w-full"
                              placeholder="Ej: 20:00"
                              value={nextMatch.time}
                              onChange={(e) => updateNextMatch({ ...nextMatch, time: e.target.value })}
                           />
                        </div>
                        <div>
                           <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Campo</label>
                           <input
                              className="admin-input w-full"
                              placeholder="Ej: Campo 2"
                              value={nextMatch.location}
                              onChange={(e) => updateNextMatch({ ...nextMatch, location: e.target.value })}
                           />
                        </div>
                     </div>
                  </div>

                  {/* New/Edit Result Form */}
                  <div className={`bg-neutral-800 border-l-4 ${editingMatchId ? 'border-yellow-500' : 'border-fp-orange'} p-6 rounded-r-xl transition-colors`}>
                     <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2">
                        {editingMatchId ? <Edit2 size={16} className="text-yellow-500" /> : <Plus size={16} />}
                        {editingMatchId ? 'Editar Resultado Existente' : 'Registrar Nuevo Resultado'}
                     </h3>

                     <MatchForm
                        initialData={editingMatchId ? matches.find(m => m.id === editingMatchId) : undefined}
                        isEditing={!!editingMatchId}
                        onCancel={() => setEditingMatchId(null)}
                        onSubmit={(matchData) => {
                           if (editingMatchId) {
                              editMatch(editingMatchId, { ...matchData, id: editingMatchId });
                              setEditingMatchId(null);
                           } else {
                              addMatch({ ...matchData, id: Date.now().toString() });
                           }
                        }}
                     />
                  </div>

                  {/* Matches History List */}
                  <div className="bg-black border border-gray-800 p-6 rounded-xl">
                     <h3 className="text-gray-400 font-bold uppercase mb-4 text-sm">Historial de Partidos</h3>
                     <div className="space-y-2">
                        {matches.map((m, idx) => (
                           <div key={m.id || idx} className={`flex flex-col md:flex-row gap-2 items-center p-3 rounded border transition-colors ${editingMatchId === m.id ? 'bg-yellow-900/20 border-yellow-500' : 'bg-gray-900 border-gray-800'}`}>
                              <div className="flex-1 flex gap-2 items-center">
                                 <div className={`w-2 h-2 rounded-full ${m.result === 'W' ? 'bg-green-500' : m.result === 'L' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                                 <span className="text-sm font-bold text-white">{m.opponent}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <span className="text-fp-orange font-bold">{m.ourScore}</span>
                                 <span className="text-gray-500">-</span>
                                 <span className="text-white font-bold">{m.theirScore}</span>
                              </div>
                              <div className="flex items-center gap-1 ml-4">
                                 <button
                                    onClick={() => setEditingMatchId(m.id || null)}
                                    className="text-yellow-500 hover:text-yellow-400 p-2 bg-yellow-500/10 rounded hover:bg-yellow-500/20"
                                    title="Editar partido"
                                 >
                                    <Edit2 size={14} />
                                 </button>
                                 <button
                                    onClick={() => {
                                       if (window.confirm('¿Borrar este partido?')) {
                                          m.id && deleteMatch(m.id);
                                          if (editingMatchId === m.id) setEditingMatchId(null);
                                       }
                                    }}
                                    className="text-red-500 hover:text-red-400 p-2 bg-red-500/10 rounded hover:bg-red-500/20"
                                    title="Eliminar partido"
                                 >
                                    <Trash size={14} />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* CONTENT: Roster */}
            {activeTab === 'roster' && (
               <div className="animate-fade-in-up">
                  <button
                     onClick={handleCreatePlayer}
                     className="w-full bg-fp-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl mb-6 flex items-center justify-center gap-2 transition-colors"
                  >
                     <UserPlus size={20} /> Añadir Jugador Nuevo
                  </button>

                  <div className="grid grid-cols-1 gap-4">
                     {roster.map((player, idx) => (
                        <details key={player.id || idx} className="bg-black border border-gray-800 rounded-xl group overflow-hidden">
                           <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors bg-gray-900/50">
                              <div className="flex items-center gap-3">
                                 {player.photo ?
                                    <img src={player.photo} className="w-8 h-8 rounded-full object-cover border border-gray-600" /> :
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600"><UserCog size={14} /></div>
                                 }
                                 <span className="font-display font-bold text-xl text-fp-orange w-8">{player.number}</span>
                                 <span className="font-bold text-white">{player.name}</span>
                              </div>
                              <span className="text-xs text-gray-500 uppercase font-bold">Editar</span>
                           </summary>

                           <div className="p-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                              {/* Delete Button */}
                              <button
                                 onClick={() => {
                                    if (window.confirm(`¿Seguro que quieres eliminar a ${player.name} del equipo?`)) {
                                       player.id && deletePlayer(player.id);
                                    }
                                 }}
                                 className="absolute top-4 right-4 text-red-500 hover:bg-red-900/20 hover:text-red-400 p-2 rounded transition-colors flex items-center gap-1 text-xs font-bold uppercase"
                                 title="Eliminar Jugador"
                              >
                                 <Trash size={14} /> Eliminar
                              </button>

                              <div className="md:col-span-2">
                                 <label className="text-xs text-fp-orange uppercase font-bold block mb-2">Foto del Jugador</label>
                                 <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
                                       {player.photo ? (
                                          <img src={player.photo} className="w-full h-full object-cover" />
                                       ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-600"><UserCog size={32} /></div>
                                       )}
                                    </div>
                                    <div className="flex-1">
                                       <label className="cursor-pointer bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 w-fit mb-2 transition-colors">
                                          <Upload size={16} /> Subir Foto (Archivo)
                                          <input
                                             type="file"
                                             accept="image/*"
                                             className="hidden"
                                             onChange={(e) => handleImageUpload(e, (url) => {
                                                updatePlayer({ ...player, photo: url });
                                             })}
                                          />
                                       </label>
                                       <p className="text-[10px] text-gray-500">*Usa fotos ligeras para que la web cargue rápido.</p>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Nombre</label>
                                 <input
                                    className="admin-input w-full"
                                    value={player.name}
                                    onChange={(e) => {
                                       updatePlayer({ ...player, name: e.target.value });
                                    }}
                                 />
                              </div>
                              <div>
                                 <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Dorsal</label>
                                 <input
                                    type="number"
                                    className="admin-input w-full"
                                    value={player.number}
                                    onChange={(e) => {
                                       updatePlayer({ ...player, number: parseInt(e.target.value) });
                                    }}
                                 />
                              </div>
                              <div>
                                 <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Posición</label>
                                 <select
                                    className="admin-input w-full"
                                    value={player.position}
                                    onChange={(e) => {
                                       // @ts-ignore
                                       updatePlayer({ ...player, position: e.target.value });
                                    }}
                                 >
                                    <option value="POR">Portero</option>
                                    <option value="DEF">Defensa</option>
                                    <option value="MED">Medio</option>
                                    <option value="DEL">Delantero</option>
                                 </select>
                              </div>
                              <div>
                                 <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Apodo</label>
                                 <input
                                    className="admin-input w-full"
                                    value={player.nickname || ''}
                                    placeholder="Ej: El Muro"
                                    onChange={(e) => {
                                       updatePlayer({ ...player, nickname: e.target.value });
                                    }}
                                 />
                              </div>
                              <div>
                                 <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Trabajo</label>
                                 <input
                                    className="admin-input w-full"
                                    value={player.job}
                                    onChange={(e) => {
                                       updatePlayer({ ...player, job: e.target.value });
                                    }}
                                 />
                              </div>
                              <div>
                                 <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Edad</label>
                                 <input
                                    className="admin-input w-full"
                                    value={player.age}
                                    onChange={(e) => {
                                       updatePlayer({ ...player, age: e.target.value });
                                    }}
                                 />
                              </div>
                              <div className="md:col-span-2">
                                 <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Bio / Descripción</label>
                                 <textarea
                                    className="admin-input w-full h-20"
                                    value={player.bio}
                                    onChange={(e) => {
                                       updatePlayer({ ...player, bio: e.target.value });
                                    }}
                                 />
                              </div>
                              {/* Stats Editor */}
                              <div className="md:col-span-2 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                                 <label className="text-xs text-fp-orange uppercase font-bold mb-2 block">Estadísticas (FIFA 0-99)</label>
                                 <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {Object.entries(player.stats).map(([stat, val]) => (
                                       <div key={stat}>
                                          <span className="text-[10px] uppercase text-gray-500 block text-center mb-1">{stat}</span>
                                          <input
                                             type="number"
                                             className="admin-input w-full text-center p-1 font-bold"
                                             value={val}
                                             onChange={(e) => {
                                                const newStats = { ...player.stats, [stat]: parseInt(e.target.value) };
                                                updatePlayer({ ...player, stats: newStats });
                                             }}
                                          />
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </details>
                     ))}
                  </div>
               </div>
            )}

            {/* CONTENT: Club Settings */}
            {activeTab === 'club' && (
               <div className="animate-fade-in-up">
                  <div className="bg-black border border-gray-800 p-6 rounded-xl">
                     <h3 className="text-fp-orange font-bold uppercase mb-4 flex items-center gap-2">
                        <ImageIcon size={18} /> Foto Oficial del Equipo
                     </h3>
                     <div className="space-y-4">
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                           <label className="text-xs text-gray-500 uppercase block mb-4 font-bold">Cambiar Imagen de Portada</label>

                           <label className="cursor-pointer bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto">
                              <Upload size={20} />
                              <span>Seleccionar Archivo de Foto</span>
                              <input
                                 type="file"
                                 accept="image/*"
                                 className="hidden"
                                 onChange={(e) => handleImageUpload(e, updateTeamPhoto)}
                              />
                           </label>
                           <p className="text-xs text-gray-600 mt-3 text-center sm:text-left">
                              *Recomendado: Foto horizontal de todo el equipo.
                           </p>
                        </div>

                        <div className="mt-6">
                           <p className="text-xs text-gray-500 uppercase font-bold mb-2">Vista Previa Actual:</p>
                           <div className="border-4 border-gray-800 rounded-xl overflow-hidden relative h-64 w-full group">
                              <img src={teamPhoto} className="w-full h-full object-cover" alt="Preview" />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <span className="text-white font-bold">Portada Actual</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* CONTENT: News */}
            {activeTab === 'news' && (
               <div className="animate-fade-in-up">
                  <div className="bg-black border border-gray-800 p-6 rounded-xl mb-8">
                     <h3 className="text-fp-orange font-bold uppercase mb-4 flex items-center gap-2"><Plus size={16} /> Publicar Noticia</h3>
                     <NewNewsForm onAdd={addNews} />
                  </div>

                  <div className="space-y-4">
                     {news.map(item => (
                        <div key={item.id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex justify-between items-start">
                           <div>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${item.type === 'lesion' ? 'bg-red-900 text-red-400' : 'bg-blue-900 text-blue-400'
                                 }`}>{item.type}</span>
                              <h4 className="font-bold text-white mt-1">{item.title}</h4>
                              <p className="text-gray-400 text-sm mt-1">{item.content}</p>
                           </div>
                           <button
                              onClick={() => deleteNews(item.id)}
                              className="text-red-500 hover:text-red-400 p-2"
                           >
                              <Trash size={18} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

// -- SUBCOMPONENTS --

const MatchForm = ({
   initialData,
   isEditing = false,
   onSubmit,
   onCancel
}: {
   initialData?: MatchResult,
   isEditing: boolean,
   onSubmit: (d: any) => void,
   onCancel: () => void
}) => {
   const [opponent, setOpponent] = useState(initialData?.opponent || '');
   const [ourScore, setOurScore] = useState(initialData?.ourScore || 0);
   const [theirScore, setTheirScore] = useState(initialData?.theirScore || 0);
   const [result, setResult] = useState<'W' | 'L' | 'D'>(initialData?.result || 'W');

   // Update local state if initialData changes (e.g. switching edit modes)
   React.useEffect(() => {
      if (initialData) {
         setOpponent(initialData.opponent);
         setOurScore(initialData.ourScore);
         setTheirScore(initialData.theirScore);
         setResult(initialData.result);
      } else {
         setOpponent('');
         setOurScore(0);
         setTheirScore(0);
         setResult('W');
      }
   }, [initialData]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
         opponent,
         ourScore,
         theirScore,
         result
      });
      if (!isEditing) {
         setOpponent('');
         setOurScore(0);
         setTheirScore(0);
      }
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
         <div className="flex-1 w-full">
            <label className="text-[10px] text-gray-400 uppercase mb-1 block font-bold">Rival</label>
            <input className="admin-input w-full" value={opponent} onChange={e => setOpponent(e.target.value)} required placeholder="Nombre del equipo" />
         </div>
         <div className="w-20">
            <label className="text-[10px] text-gray-400 uppercase mb-1 block font-bold">FP</label>
            <input type="number" className="admin-input w-full text-center" value={ourScore} onChange={e => setOurScore(parseInt(e.target.value))} />
         </div>
         <div className="w-20">
            <label className="text-[10px] text-gray-400 uppercase mb-1 block font-bold">Rival</label>
            <input type="number" className="admin-input w-full text-center" value={theirScore} onChange={e => setTheirScore(parseInt(e.target.value))} />
         </div>
         <div className="w-32">
            <label className="text-[10px] text-gray-400 uppercase mb-1 block font-bold">Resultado</label>
            <select className="admin-input w-full" value={result} onChange={e => setResult(e.target.value as any)}>
               <option value="W">Victoria</option>
               <option value="D">Empate</option>
               <option value="L">Derrota</option>
            </select>
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            {isEditing && (
               <button type="button" onClick={onCancel} className="bg-gray-700 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-gray-600 flex-1">
                  X
               </button>
            )}
            <button type="submit" className={`${isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white hover:bg-gray-200'} text-black font-bold py-2.5 px-4 rounded-lg flex-1 whitespace-nowrap`}>
               {isEditing ? 'Guardar Cambios' : 'Añadir'}
            </button>
         </div>
      </form>
   );
};

const NewNewsForm = ({ onAdd }: { onAdd: (n: any) => void }) => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [type, setType] = useState('oficial');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAdd({
         id: Date.now().toString(),
         date: 'Hoy',
         title,
         content,
         type
      });
      setTitle('');
      setContent('');
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
               <input
                  className="admin-input w-full"
                  placeholder="Título"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
               />
            </div>
            <div>
               <select
                  className="admin-input w-full"
                  value={type}
                  onChange={e => setType(e.target.value)}
               >
                  <option value="oficial">Oficial</option>
                  <option value="lesion">Lesión</option>
                  <option value="fichaje">Fichaje</option>
                  <option value="partido">Partido</option>
               </select>
            </div>
         </div>
         <textarea
            className="admin-input w-full h-24"
            placeholder="Contenido del comunicado..."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
         />
         <button type="submit" className="bg-fp-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg text-sm">
            Publicar
         </button>

         <style>{`
           .admin-input {
             background: #1a1a1a;
             border: 1px solid #333;
             color: white;
             padding: 0.5rem 1rem;
             border-radius: 0.5rem;
             outline: none;
             transition: border-color 0.2s;
           }
           .admin-input:focus {
             border-color: #FF6B00;
           }
         `}</style>
      </form>
   );
};