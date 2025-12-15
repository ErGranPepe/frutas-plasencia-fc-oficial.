import React, { useState, useEffect } from 'react';
import { TeamProvider } from './context/TeamContext';
import { Hero } from './components/Hero';
import { Roster } from './components/Roster';
import { Trophies } from './components/Trophies';
import { Matches } from './components/Matches';
import { Quiz } from './components/Quiz';
import { Raffle } from './components/Raffle';
import { NewsBoard } from './components/NewsBoard';
import { AdminPanel } from './components/AdminPanel';
import { Logo } from './components/Logo';
import { Menu, X, Instagram, ExternalLink, ShieldCheck, Lock } from 'lucide-react';

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = ['Plantilla', 'Palmares', 'Partidos', 'Quiz', 'Sorteo'];

  return (
    <div className="min-h-screen bg-fp-dark text-white selection:bg-fp-orange selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-fp-dark/95 backdrop-blur-sm border-b border-gray-800 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('top')}>
               <div className="w-10 h-10">
                 <Logo />
               </div>
               <span className="font-display font-bold text-xl tracking-wide hidden sm:block">FRUTAS PLASENCIA</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-baseline space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors ${
                      item === 'Sorteo' ? 'text-yellow-400 hover:text-yellow-300 border border-yellow-500/50 bg-yellow-500/10' : 'hover:text-fp-orange'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              
              {/* Desktop Admin Button */}
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white px-4 py-2 rounded-full border border-gray-700 transition-all text-xs font-bold uppercase tracking-wider"
                title="Acceso Capitán"
              >
                <ShieldCheck size={16} className="text-fp-orange" />
                <span>Capi</span>
              </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              {/* Mobile Admin Icon */}
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="text-gray-400 hover:text-fp-orange"
              >
                <ShieldCheck size={24} />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-fp-dark border-b border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`block px-3 py-2 rounded-md text-base font-bold uppercase w-full text-left ${
                    item === 'Sorteo' ? 'text-yellow-400 bg-yellow-900/20' : 'text-gray-300 hover:text-fp-orange'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Admin Modal */}
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}

      <main id="top">
        <Hero />
        <NewsBoard />
        <Roster />
        <Trophies />
        <Matches />
        <Quiz />
        <Raffle />
      </main>

      <footer className="bg-black py-12 border-t-2 border-fp-orange">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Logo className="w-16 h-16 opacity-80" />
            <div>
              <h3 className="font-display text-2xl font-bold text-white">FRUTAS PLASENCIA FC</h3>
              <p className="text-gray-500 text-sm">Desde Liga Estoril II para el mundo.</p>
            </div>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/frutas_plasencia/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-fp-orange transition-colors"
            >
              <Instagram size={28} />
            </a>
            <a 
              href="https://www.competize.com/competition/overview/159670" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-fp-orange transition-colors"
            >
              <ExternalLink size={28} />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center mt-12 gap-4">
          <div className="text-gray-600 text-xs text-center">
            © {new Date().getFullYear()} Frutas Plasencia FC. No oficial. Fan made.
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <TeamProvider>
      <AppContent />
    </TeamProvider>
  );
};

export default App;