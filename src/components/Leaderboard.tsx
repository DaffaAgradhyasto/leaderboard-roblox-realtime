'use client';

import React, { useState, useEffect } from 'react';
import { GameCard, GameCardSkeleton } from './GameCard';
import { CategoryTabs, CategoryDescription } from './CategoryTabs';
import { useLeaderboard } from './useLeaderboard';
import { ChartCategory } from '@/types/game';

export function Leaderboard() {
  const [category, setCategory] = useState<ChartCategory>('top-playing-now');
  const [countdown, setCountdown] = useState(60);
  const { data, loading, error, lastUpdated, refresh } = useLeaderboard(category);

  // Countdown timer for next update
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset countdown on category change
  useEffect(() => {
    setCountdown(60);
  }, [category, lastUpdated]);

  const formatTime = (date: Date | null): string => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with live status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-4 py-2 border border-green-500/30">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-green-400 font-medium text-sm">LIVE</span>
          </div>

          {/* Last updated */}
          <div className="text-gray-400 text-sm">
            <span className="hidden sm:inline">Last updated: </span>
            <span className="font-mono text-cyan-400">{formatTime(lastUpdated)}</span>
          </div>
        </div>

        {/* Next update countdown */}
        <div className="flex items-center gap-4">
          <div className="text-gray-400 text-sm">
            <span className="hidden sm:inline">Next update in: </span>
            <span className="font-mono text-purple-400">{countdown}s</span>
          </div>

          {/* Manual refresh */}
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-cyan-500/50 disabled:opacity-50"
          >
            <svg
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-8">
        <CategoryTabs activeCategory={category} onCategoryChange={setCategory} />
      </div>

      {/* Category description */}
      <CategoryDescription category={category} />

      {/* Error state */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-center">
          <p className="text-red-400">Error loading data: {error}</p>
          <button
            onClick={refresh}
            className="mt-2 text-cyan-400 hover:text-cyan-300 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Top 3 Featured */}
      {(loading && data.length === 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <GameCardSkeleton key={i} featured />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {top3.map((item) => (
            <GameCard key={item.game.universeId || item.rank} item={item} featured />
          ))}
        </div>
      )}

      {/* Rest of the leaderboard */}
      <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 rounded-3xl"></div>
        
        <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Full Rankings
          </h3>

          {(loading && data.length === 0) ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <GameCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {rest.map((item) => (
                <GameCard key={item.game.universeId || item.rank} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats footer */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Games"
          value={data.length.toString()}
          icon="🎮"
          gradient="from-cyan-500 to-blue-500"
        />
        <StatCard
          label="Total Playing"
          value={formatLargeNumber(data.reduce((sum, item) => sum + (item.game.playing || 0), 0))}
          icon="👥"
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          label="Update Interval"
          value="60s"
          icon="⏱️"
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          label="Data Source"
          value="Roblox API"
          icon="🔗"
          gradient="from-orange-500 to-red-500"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  gradient,
}: {
  label: string;
  value: string;
  icon: string;
  gradient: string;
}) {
  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-sm opacity-25 group-hover:opacity-50 transition-opacity`}></div>
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
            <div className={`text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatLargeNumber(num: number): string {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K';
  return num.toString();
}
