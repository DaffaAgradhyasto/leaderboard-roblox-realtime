// Roblox Game Types

export interface RobloxGame {
  id: number;
  name: string;
  description?: string;
  creator: {
    id: number;
    name: string;
    type: 'User' | 'Group';
  };
  rootPlaceId: number;
  playing: number;
  visits: number;
  maxPlayers: number;
  created: string;
  updated: string;
  favoritedCount: number;
  genre?: string;
  thumbnailUrl?: string;
  iconUrl?: string;
}

export interface GameSortToken {
  token: string;
  name: string;
  displayName: string;
  gameSetTypeId: number;
  gameSetTargetId: number | null;
  timeOptionsAvailable: boolean;
  genreOptionsAvailable: boolean;
  numberOfRows: number;
  numberOfGames: number | null;
  isDefaultSort: boolean;
  contextUniverseId: number | null;
  contextCountryRegionId: number | null;
  tokenExpiryInSeconds: number;
}

export interface GamesListEntry {
  creatorId: number;
  creatorName: string;
  creatorType: 'User' | 'Group';
  creatorHasVerifiedBadge: boolean;
  totalUpVotes: number;
  totalDownVotes: number;
  universeId: number;
  name: string;
  placeId: number;
  playerCount: number;
  imageToken: string;
  isSponsored: boolean;
  nativeAdData: string;
  isShowSponsoredLabel: boolean;
  price: number | null;
  analyticsIdentifier: string | null;
  gameDescription: string;
  genre: string;
  minimumAge: number;
  ageRecommendationDisplayName: string;
}

export interface GamesListResponse {
  games: GamesListEntry[];
  suggestedKeyword: string | null;
  correctedKeyword: string | null;
  filteredKeyword: string | null;
  hasMoreRows: boolean;
  nextPageExclusiveStartId: number | null;
  featuredSearchUniverseId: number | null;
  emphasis: boolean;
  cutOffIndex: number | null;
  algorithm: string;
  algorithmQueryType: string;
  suggestionAlgorithm: string | null;
  relatedGames: GamesListEntry[];
  esDebugInfo: string | null;
  gameSetTypeId: number | null;
}

export interface ThumbnailData {
  targetId: number;
  state: 'Completed' | 'Pending' | 'Error';
  imageUrl: string;
}

export interface LeaderboardGame {
  rank: number;
  universeId: number;
  placeId: number;
  name: string;
  description: string;
  playerCount: number;
  totalUpVotes: number;
  totalDownVotes: number;
  rating: number;
  creatorName: string;
  creatorType: 'User' | 'Group';
  genre: string;
  thumbnailUrl: string;
  iconUrl: string;
  ageRecommendation: string;
  playerCountChange?: number;
  lastUpdated: string;
}

export interface LeaderboardResponse {
  games: LeaderboardGame[];
  lastUpdated: string;
  nextUpdate: string;
  totalCount: number;
  sortType: string;
}

export type SortType = 'trending' | 'top-playing' | 'top-rated' | 'top-earning';
export type TimeFilter = 'now' | 'day' | 'week' | 'month' | 'year' | 'alltime';
export type DeviceType = 'all' | 'phone' | 'tablet' | 'computer' | 'console' | 'vr';
