import React, { useState } from 'react';
import { QUIZ_QUESTIONS, ROSTER } from '../constants';
import { ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Player } from '../types';

export const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ POR: 0, DEF: 0, MED: 0, DEL: 0 });
  const [result, setResult] = useState<Player | null>(null);
  const [started, setStarted] = useState(false);

  const handleAnswer = (points: Record<string, number>) => {
    const newScores = { ...scores };
    Object.keys(points).forEach((key) => {
      newScores[key] = (newScores[key] || 0) + points[key];
    });
    setScores(newScores);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: typeof scores) => {
    const sortedPositions = Object.entries(finalScores).sort(([, a], [, b]) => (b as number) - (a as number));
    const winningPosition = sortedPositions[0][0];
    const eligiblePlayers = ROSTER.filter(p => p.position === winningPosition);
    const randomMatch = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)] || eligiblePlayers[0] || ROSTER[0];
    setResult(randomMatch);
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQuestionIndex(0);
    setScores({ POR: 0, DEF: 0, MED: 0, DEL: 0 });
    setResult(null);
  };

  if (!started) {
    return (
      <section id="quiz" className="py-24 bg-gradient-to-br from-neutral-900 to-fp-gray border-t-4 border-fp-orange scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-fp-orange text-lg font-bold tracking-widest uppercase mb-2 block">
            Test Oficial
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            ¿Qué jugador de Frutas Plasencia eres?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Responde estas preguntas para descubrir tu alma gemela en el campo. 
            ¿Eres un muro como SP? ¿O un goleador como Alubia?
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-fp-orange font-sans rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-900 shadow-[0_0_20px_rgba(255,107,0,0.4)]"
          >
            Comenzar Test
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section id="quiz" className="py-24 bg-neutral-900 min-h-[600px] flex items-center justify-center scroll-mt-20">
         <div className="max-w-md w-full mx-auto px-4">
            <div className="bg-fp-gray rounded-2xl p-8 border-2 border-fp-orange shadow-[0_0_50px_rgba(255,107,0,0.3)] text-center animate-fade-in-up">
              <span className="text-gray-400 uppercase text-sm font-bold tracking-widest">Tu resultado</span>
              <h2 className="text-3xl font-display font-bold text-white mt-2 mb-8">Eres compatible con...</h2>
              
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 rounded-full bg-fp-orange flex items-center justify-center text-7xl font-display font-bold text-white shadow-inner mx-auto border-4 border-white/10">
                  {result.number}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white text-fp-orange p-3 rounded-full shadow-lg">
                  <CheckCircle2 size={28} />
                </div>
              </div>

              <h3 className="text-5xl font-display font-bold text-white uppercase mb-2">{result.name}</h3>
              <p className="text-fp-orange font-bold text-xl uppercase tracking-widest mb-6">
                 {result.position === 'POR' ? 'Portero' : 
                  result.position === 'DEF' ? 'Defensa' : 
                  result.position === 'MED' ? 'Centrocampista' : 'Delantero'}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-10">
                 {result.tags.map(tag => (
                   <span key={tag} className="bg-neutral-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700">#{tag}</span>
                 ))}
              </div>

              <button 
                onClick={resetQuiz}
                className="flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all bg-neutral-800 rounded-lg hover:bg-neutral-700 border border-gray-600 hover:border-gray-500"
              >
                <RefreshCw className="mr-2 w-4 h-4" />
                Repetir Test
              </button>
            </div>
         </div>
      </section>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <section id="quiz" className="py-24 bg-neutral-800 min-h-[600px] flex items-center scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <div className="mb-8 flex justify-between items-end">
          <span className="text-fp-orange font-bold text-sm tracking-wider uppercase">
            Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
          </span>
          <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-fp-orange transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-10 leading-tight">
          {question.text}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.points)}
              className="p-6 text-left bg-neutral-900 border border-gray-700 rounded-xl hover:border-fp-orange hover:bg-neutral-800 transition-all duration-200 group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-fp-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-lg md:text-xl text-gray-300 group-hover:text-white font-medium pl-2 block">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};