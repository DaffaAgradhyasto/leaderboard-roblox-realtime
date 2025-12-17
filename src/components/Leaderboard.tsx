'use client';

import { useState, useEffect, useCallback } from 'react';
import { LeaderboardGame, LeaderboardResponse, SortType } from '@/types/roblox';
import GameCard from './GameCard';

interface LeaderboardProps {
  initialSortType?: SortType;
  refreshInterval?: number;
}

export default function Leaderboard({ 
  initialSortType = 'trending',
  refreshInterval = 60000 
}: LeaderboardProps) {
  const [games, setGames] = useState<LeaderboardGame[]>([]);
  const [sortType, setSortType] = useState<SortType>(initialSortType);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    try {
      setError(null);
      const endpoint = sortType === 'top-playing' 
        ? '/api/games/top-playing' 
        : '/api/games/trending';
      
      const response = await fetch(`${endpoint}?limit=50`, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      
      const data: LeaderboardResponse = await response.json();
      
      setGames(data.games);
      setLastUpdated(data.lastUpdated);
      setCountdown(60);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sortType]);

  // Initial fetch and refresh interval
  useEffect(() => {
    fetchGames();
    
    const interval = setInterval(() => {
      fetchGames();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchGames, refreshInterval]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 60));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSortChange = (newSortType: SortType) => {
    setSortType(newSortType);
    setIsLoading(true);
  };

  const totalPlayers = games.reduce((sum, game) => sum + game.playerCount, 0);

  return (
    <div className="leaderboard w-full">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        {/* Sort Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'trending', label: '🔥 Trending', icon: '📈' },
            { id: 'top-playing', label: '🎮 Top Playing', icon: '🏆' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSortChange(tab.id as SortType)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                sortType === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-white border border-cyan-500/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats & Refresh */}
        <div className="flex items-center gap-4">
          {/* Total Players */}
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <span className="text-green-400 font-medium">
              <span className="animate-pulse mr-2">●</span>
              {(totalPlayers / 1000000).toFixed(2)}M+ playing now
            </span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-cyan-500/20">
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-slate-700"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-cyan-500"
                  strokeDasharray={`${(countdown / 60) * 88} 88`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cyan-400">
                {countdown}
              </span>
            </div>
            <span className="text-gray-400 text-sm">Next refresh</span>
          </div>

          {/* Manual Refresh */}
          <button
            onClick={fetchGames}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all disabled:opacity-50"
          >
            <svg 
              className={`w-5 h-5 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-sm text-gray-500 mb-4">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center mb-8">
          <p className="font-medium">{error}</p>
          <button
            onClick={fetchGames}
            className="mt-3 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && games.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl bg-slate-800/50 border border-cyan-500/20"
            >
              <div className="aspect-video bg-slate-700/50" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                <div className="h-3 bg-slate-700/50 rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-700/50 rounded w-16" />
                  <div className="h-6 bg-slate-700/50 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Featured Games (Top 3) */}
      {!isLoading && games.length > 0 && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">👑</span> Top 3 Games
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {games.slice(0, 3).map((game) => (
                <GameCard key={game.universeId} game={game} variant="featured" />
              ))}
            </div>
          </div>

          {/* Rest of Games */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> Full Leaderboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.slice(3).map((game) => (
                <GameCard key={game.universeId} game={game} variant="default" />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!isLoading && games.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
          <p className="text-gray-400">Try refreshing or check back later.</p>
        </div>
      )}
    </div>
  );
}
