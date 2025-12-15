import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player, MatchResult, NewsItem } from '../types';

interface TeamData {
  roster: Player[];
  matches: MatchResult[];
  nextMatch: any; // Using any for simplicity as it matches the object structure
  news: NewsItem[];
  teamPhoto: string;
  updateRoster: (newRoster: Player[]) => void; // Keeping for compatibility, but prefer updatePlayer
  updatePlayer: (player: Player) => void; // NEW
  addPlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
  updateMatches: (newMatches: MatchResult[]) => void;
  addMatch: (match: MatchResult) => void;
  editMatch: (id: string, updatedMatch: MatchResult) => void;
  deleteMatch: (id: string) => void;
  updateNextMatch: (newNext: any) => void;
  updateTeamPhoto: (url: string) => void;
  addNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;
}

const TeamContext = createContext<TeamData | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roster, setRoster] = useState<Player[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [nextMatch, setNextMatch] = useState<any>({});
  const [news, setNews] = useState<NewsItem[]>([]);
  const [teamPhoto, setTeamPhoto] = useState<string>("");

  // Load from API on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, mRes, nRes, nmRes, tpRes] = await Promise.all([
        fetch('/api/players'),
        fetch('/api/matches'),
        fetch('/api/news'),
        fetch('/api/settings/nextMatch'),
        fetch('/api/settings/teamPhoto')
      ]);

      if (pRes.ok) setRoster(await pRes.json());
      if (mRes.ok) setMatches(await mRes.json());
      if (nRes.ok) setNews(await nRes.json());
      if (nmRes.ok) setNextMatch(await nmRes.json());
      if (tpRes.ok) {
        const data = await tpRes.json();
        setTeamPhoto(data.value);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // -- PLAYERS --
  const updateRoster = (newRoster: Player[]) => {
    // Deprecated usage fallback, tries to sync local state only? 
    // Or we could try to bulk update if backend supported it.
    // GUIDANCE: UI should use updatePlayer. 
    // For now we just update local state to not break UI immediately, 
    // but changes won't persist if this is called alone for edits!
    setRoster(newRoster);
  };

  const updatePlayer = async (player: Player) => {
    // Optimistic update
    setRoster(prev => prev.map(p => p.id === player.id ? player : p));
    try {
      await fetch(`/api/players/${player.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
      });
    } catch (e) {
      console.error("Error updating player", e);
    }
  };

  const addPlayer = async (player: Player) => {
    setRoster(prev => [...prev, player]);
    await fetch('/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player)
    });
  };

  const deletePlayer = async (id: string) => {
    setRoster(prev => prev.filter(p => p.id !== id));
    await fetch(`/api/players/${id}`, { method: 'DELETE' });
  };

  // -- MATCHES --
  const updateMatches = (newMatches: MatchResult[]) => {
    setMatches(newMatches); // Local only fallback
  };

  const addMatch = async (match: MatchResult) => {
    setMatches(prev => [match, ...prev]);
    await fetch('/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(match)
    });
  };

  const editMatch = async (id: string, updatedMatch: MatchResult) => {
    setMatches(prev => prev.map(m => m.id === id ? updatedMatch : m));
    await fetch(`/api/matches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMatch)
    });
  };

  const deleteMatch = async (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
    await fetch(`/api/matches/${id}`, { method: 'DELETE' });
  };

  // -- SETTINGS --
  const updateNextMatch = async (newNext: any) => {
    setNextMatch(newNext);
    await fetch('/api/settings/nextMatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNext)
    });
  };

  const updateTeamPhoto = async (url: string) => {
    setTeamPhoto(url);
    await fetch('/api/settings/teamPhoto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: url })
    });
  };

  // -- NEWS --
  const addNews = async (item: NewsItem) => {
    setNews(prev => [item, ...prev]);
    await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  };

  const deleteNews = async (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
  };

  return (
    <TeamContext.Provider value={{
      roster,
      matches,
      nextMatch,
      news,
      teamPhoto,
      updateRoster,
      updatePlayer,
      addPlayer,
      deletePlayer,
      updateMatches,
      addMatch,
      editMatch,
      deleteMatch,
      updateNextMatch,
      updateTeamPhoto,
      addNews,
      deleteNews
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamData = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeamData must be used within a TeamProvider');
  }
  return context;
};