export interface PlayerStats {
  ritmo: number;
  tiro: number;
  pase: number;
  regate: number;
  defensa: number;
  fisico: number;
}

export interface Player {
  id?: string; // Added ID for easier management
  number: number;
  name: string;
  position: 'POR' | 'DEF' | 'MED' | 'DEL'; // Portero, Defensa, Medio, Delantero
  nickname?: string;
  photo?: string; // URL for player image
  tags: string[]; // For compatibility matching
  age: string | number;
  job: string;
  bio: string;
  stats: PlayerStats;
}

export interface MatchResult {
  id?: string; // Added ID for easier deletion
  opponent: string;
  ourScore: number;
  theirScore: number;
  result: 'W' | 'L' | 'D';
  date?: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: Record<string, number>; // Maps to position vibes
  }[];
}

export interface TrophyItem {
  id: string;
  title: string;
  year: string;
  description: string;
  type: 'gold' | 'silver' | 'bronze';
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  type: 'lesion' | 'fichaje' | 'partido' | 'oficial';
  content: string;
}