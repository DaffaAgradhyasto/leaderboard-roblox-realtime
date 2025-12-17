export interface RobloxGame {
  universeId: number;
  name: string;
  rootPlaceId: number;
  description?: string;
  creator?: {
    id: number;
    name: string;
    type: string;
  };
  price?: number;
  playing?: number;
  visits?: number;
  maxPlayers?: number;
  created?: string;
  updated?: string;
  favoritedCount?: number;
  genre?: string;
  thumbnailUrl?: string;
}

export interface GameChartItem {
  rank: number;
  game: RobloxGame;
  score?: number;
  change?: number; // rank change from last update
}

export interface ChartData {
  category: ChartCategory;
  timestamp: Date;
  games: GameChartItem[];
}

export type ChartCategory = 
  | 'top-playing-now' 
  | 'trending' 
  | 'top-earning' 
  | 'top-visited' 
  | 'top-rated';

export interface ChartFilters {
  device?: 'all' | 'computer' | 'phone' | 'tablet' | 'console';
  country?: string;
  timeFrame?: '24h' | '7d' | '30d' | 'all';
}
