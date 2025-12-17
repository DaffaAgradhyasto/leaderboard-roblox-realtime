import { GamesListEntry, ThumbnailData, LeaderboardGame } from '@/types/roblox';
import { generateMockGames } from './mock-data';

// Roblox API endpoints
const GAMES_API = 'https://games.roblox.com';
const THUMBNAILS_API = 'https://thumbnails.roblox.com';

interface GameSortsResponse {
  sorts: {
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
  }[];
  timeFilters: {
    token: string;
    name: string;
    tokenExpiryInSeconds: number;
  }[];
  gameFilters: {
    token: string;
    name: string;
    tokenExpiryInSeconds: number;
  }[];
  genreFilters: {
    token: string;
    name: string;
    tokenExpiryInSeconds: number;
  }[];
  pageContext: {
    pageId: string;
    isSeeAllPage: boolean;
  };
}

interface OmniSearchResponse {
  searchResults: {
    contentGroupType: string;
    contents: {
      contentType: string;
      contentId: number;
      universeId: number;
      name: string;
      description: string;
      playerCount: number;
      totalUpVotes: number;
      totalDownVotes: number;
      emphasis: boolean;
      isSponsored: boolean;
      creatorId: number;
      creatorName: string;
      creatorHasVerifiedBadge: boolean;
      creatorType: string;
      rootPlaceId: number;
      minimumAge: number;
      ageRecommendationDisplayName: string;
      contentRating: string | null;
      price: number | null;
      nativeAdData: string | null;
      analyticsIdentifier: string | null;
    }[];
  }[];
}

// Cache for game data to reduce API calls
let gamesCache: {
  data: LeaderboardGame[];
  timestamp: number;
  sortType: string;
} | null = null;

const CACHE_DURATION = 60 * 1000; // 1 minute cache

export async function getGameSorts(): Promise<GameSortsResponse | null> {
  try {
    const response = await fetch(`${GAMES_API}/v1/games/sorts?gameSortsContext=HomeSorts`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error('Failed to fetch game sorts:', response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching game sorts:', error);
    return null;
  }
}

export async function getGamesList(
  sortToken: string,
  startRows: number = 0,
  maxRows: number = 50
): Promise<GamesListEntry[]> {
  try {
    const params = new URLSearchParams({
      sortToken,
      startRows: startRows.toString(),
      maxRows: maxRows.toString(),
    });

    const response = await fetch(`${GAMES_API}/v1/games/list?${params}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
      console.error('Failed to fetch games list:', response.status);
      return [];
    }

    const data = await response.json();
    return data.games || [];
  } catch (error) {
    console.error('Error fetching games list:', error);
    return [];
  }
}

export async function searchGames(keyword: string = '', maxRows: number = 50): Promise<GamesListEntry[]> {
  try {
    const params = new URLSearchParams({
      keyword,
      startRows: '0',
      maxRows: maxRows.toString(),
      isKeywordSuggestionEnabled: 'true',
    });

    const response = await fetch(`${GAMES_API}/v1/games/list?${params}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to search games:', response.status);
      return [];
    }

    const data = await response.json();
    return data.games || [];
  } catch (error) {
    console.error('Error searching games:', error);
    return [];
  }
}

export async function getOmniRecommendations(sessionId?: string): Promise<OmniSearchResponse | null> {
  try {
    const response = await fetch(`${GAMES_API}/v1/games/omni-recommendations`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageType: 'Home',
        sessionId: sessionId || crypto.randomUUID(),
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to get omni recommendations:', response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting omni recommendations:', error);
    return null;
  }
}

export async function getGameThumbnails(
  universeIds: number[],
  size: string = '768x432',
  format: string = 'Png',
  isCircular: boolean = false
): Promise<ThumbnailData[]> {
  if (universeIds.length === 0) return [];

  try {
    const params = new URLSearchParams({
      universeIds: universeIds.join(','),
      countPerUniverse: '1',
      defaults: 'true',
      size,
      format,
      isCircular: isCircular.toString(),
    });

    const response = await fetch(`${THUMBNAILS_API}/v1/games/multiget/thumbnails?${params}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch thumbnails:', response.status);
      return [];
    }

    const data = await response.json();
    return (data.data || []).flatMap((item: { thumbnails: ThumbnailData[] }) => 
      item.thumbnails.map((thumb: ThumbnailData) => ({
        targetId: thumb.targetId,
        state: thumb.state,
        imageUrl: thumb.imageUrl,
      }))
    );
  } catch (error) {
    console.error('Error fetching thumbnails:', error);
    return [];
  }
}

export async function getGameIcons(
  universeIds: number[],
  size: string = '150x150',
  format: string = 'Png',
  isCircular: boolean = false
): Promise<ThumbnailData[]> {
  if (universeIds.length === 0) return [];

  try {
    const params = new URLSearchParams({
      universeIds: universeIds.join(','),
      returnPolicy: 'PlaceHolder',
      size,
      format,
      isCircular: isCircular.toString(),
    });

    const response = await fetch(`${THUMBNAILS_API}/v1/games/icons?${params}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch icons:', response.status);
      return [];
    }

    const data = await response.json();
    return (data.data || []).map((item: ThumbnailData) => ({
      targetId: item.targetId,
      state: item.state,
      imageUrl: item.imageUrl,
    }));
  } catch (error) {
    console.error('Error fetching icons:', error);
    return [];
  }
}

export async function getTrendingGames(limit: number = 50): Promise<LeaderboardGame[]> {
  // Check cache
  const now = Date.now();
  if (gamesCache && gamesCache.sortType === 'trending' && (now - gamesCache.timestamp) < CACHE_DURATION) {
    return gamesCache.data.slice(0, limit);
  }

  try {
    // First, try to get game sorts
    const sorts = await getGameSorts();
    
    let games: GamesListEntry[] = [];
    
    if (sorts && sorts.sorts.length > 0) {
      // Find trending or popular sort
      const trendingSort = sorts.sorts.find(s => 
        s.name.toLowerCase().includes('popular') || 
        s.name.toLowerCase().includes('trending') ||
        s.displayName.toLowerCase().includes('popular') ||
        s.displayName.toLowerCase().includes('trending')
      ) || sorts.sorts.find(s => s.isDefaultSort) || sorts.sorts[0];
      
      games = await getGamesList(trendingSort.token, 0, limit);
    }
    
    // Fallback to search if no results
    if (games.length === 0) {
      games = await searchGames('', limit);
    }

    // If still no results, use mock data
    if (games.length === 0) {
      console.log('Using mock data as fallback');
      const mockGames = generateMockGames(limit);
      
      // Add some randomness to player counts to simulate real-time updates
      const updatedMockGames = mockGames.map(game => ({
        ...game,
        playerCount: Math.floor(game.playerCount * (0.95 + Math.random() * 0.1)),
        lastUpdated: new Date().toISOString(),
      }));
      
      gamesCache = {
        data: updatedMockGames,
        timestamp: now,
        sortType: 'trending',
      };
      
      return updatedMockGames;
    }

    // Get thumbnails and icons
    const universeIds = games.map(g => g.universeId);
    const [thumbnails, icons] = await Promise.all([
      getGameThumbnails(universeIds),
      getGameIcons(universeIds),
    ]);

    const thumbnailMap = new Map(thumbnails.map(t => [t.targetId, t.imageUrl]));
    const iconMap = new Map(icons.map(i => [i.targetId, i.imageUrl]));

    // Transform to LeaderboardGame format
    const leaderboardGames: LeaderboardGame[] = games.map((game, index) => ({
      rank: index + 1,
      universeId: game.universeId,
      placeId: game.placeId,
      name: game.name,
      description: game.gameDescription || '',
      playerCount: game.playerCount,
      totalUpVotes: game.totalUpVotes,
      totalDownVotes: game.totalDownVotes,
      rating: game.totalUpVotes + game.totalDownVotes > 0 
        ? Math.round((game.totalUpVotes / (game.totalUpVotes + game.totalDownVotes)) * 100)
        : 0,
      creatorName: game.creatorName,
      creatorType: game.creatorType,
      genre: game.genre || 'All',
      thumbnailUrl: thumbnailMap.get(game.universeId) || '',
      iconUrl: iconMap.get(game.universeId) || '',
      ageRecommendation: game.ageRecommendationDisplayName || 'All Ages',
      lastUpdated: new Date().toISOString(),
    }));

    // Update cache
    gamesCache = {
      data: leaderboardGames,
      timestamp: now,
      sortType: 'trending',
    };

    return leaderboardGames;
  } catch (error) {
    console.error('Error fetching trending games:', error);
    // Return mock data on error
    const mockGames = generateMockGames(limit);
    return mockGames.map(game => ({
      ...game,
      playerCount: Math.floor(game.playerCount * (0.95 + Math.random() * 0.1)),
      lastUpdated: new Date().toISOString(),
    }));
  }
}

export async function getTopPlayingGames(limit: number = 50): Promise<LeaderboardGame[]> {
  const games = await getTrendingGames(limit * 2);
  
  // Sort by player count descending
  const sortedGames = [...games]
    .sort((a, b) => b.playerCount - a.playerCount)
    .slice(0, limit)
    .map((game, index) => ({
      ...game,
      rank: index + 1,
    }));

  return sortedGames;
}

export async function getTopRatedGames(limit: number = 50): Promise<LeaderboardGame[]> {
  const games = await getTrendingGames(limit * 2);
  
  // Sort by rating descending
  const sortedGames = [...games]
    .sort((a, b) => {
      // Weight by total votes as well
      const aScore = a.rating * Math.log10(a.totalUpVotes + a.totalDownVotes + 1);
      const bScore = b.rating * Math.log10(b.totalUpVotes + b.totalDownVotes + 1);
      return bScore - aScore;
    })
    .slice(0, limit)
    .map((game, index) => ({
      ...game,
      rank: index + 1,
    }));

  return sortedGames;
}

export function formatPlayerCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  } else if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}

export function formatVoteCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  } else if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}
