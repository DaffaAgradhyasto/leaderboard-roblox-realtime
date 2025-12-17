'use client';

import React, { useState, useEffect } from 'react';
import { GameChartItem } from '@/types/game';

interface GameCardProps {
  item: GameChartItem;
  featured?: boolean;
}

export function GameCard({ item, featured = false }: GameCardProps) {
  const { rank, game, change } = item;
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number | undefined): string => {
    if (!num) return '0';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const getRankColor = (rank: number): string => {
    if (rank === 1) return 'from-yellow-400 via-yellow-500 to-amber-500';
    if (rank === 2) return 'from-gray-300 via-gray-400 to-slate-400';
    if (rank === 3) return 'from-amber-600 via-orange-500 to-orange-600';
    return 'from-cyan-400 via-blue-500 to-purple-500';
  };

  const getChangeIndicator = (change: number | undefined) => {
    if (!change || change === 0) {
      return <span className="text-gray-400">−</span>;
    }
    if (change > 0) {
      return (
        <span className="text-green-400 flex items-center gap-0.5">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {change}
        </span>
      );
    }
    return (
      <span className="text-red-400 flex items-center gap-0.5">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {Math.abs(change)}
      </span>
    );
  };

  const placeholderUrl = `https://placehold.co/150x150/1f2937/6366f1?text=${encodeURIComponent(game.name?.substring(0, 2) || 'RB')}`;

  if (featured) {
    return (
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glowing border effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${getRankColor(rank)} rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500`}></div>
        
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-xl">
          {/* Rank badge */}
          <div className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br ${getRankColor(rank)} rounded-xl flex items-center justify-center font-bold text-black shadow-lg shadow-cyan-500/25`}>
            #{rank}
          </div>

          <div className="flex gap-4 items-start pt-2">
            {/* Game thumbnail */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/10">
              {!imageError ? (
                <img
                  src={game.thumbnailUrl || placeholderUrl}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {game.name?.substring(0, 2) || 'RB'}
                </div>
              )}
              
              {/* Live indicator */}
              <div className="absolute top-1 right-1 flex items-center gap-1 bg-black/60 rounded-full px-1.5 py-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-green-400 font-medium">LIVE</span>
              </div>
            </div>

            {/* Game info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-lg truncate group-hover:text-cyan-400 transition-colors">
                {game.name}
              </h3>
              
              {game.creator && (
                <p className="text-gray-400 text-sm truncate">
                  by {game.creator.name}
                </p>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg px-2 py-1.5 border border-green-500/30">
                  <div className="text-[10px] text-green-400 font-medium uppercase tracking-wider">Playing Now</div>
                  <div className="text-lg font-bold text-green-300 font-mono">
                    {formatNumber(game.playing)}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg px-2 py-1.5 border border-blue-500/30">
                  <div className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">Total Visits</div>
                  <div className="text-lg font-bold text-blue-300 font-mono">
                    {formatNumber(game.visits)}
                  </div>
                </div>
              </div>
            </div>

            {/* Rank change */}
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Change</div>
              {getChangeIndicator(change)}
            </div>
          </div>

          {/* Hover effect - play button */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <a
              href={`https://www.roblox.com/games/${game.rootPlaceId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transform transition-transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              PLAY
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Regular card
  return (
    <div
      className="group relative bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 rounded-xl p-3 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        {/* Rank */}
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRankColor(rank)} flex items-center justify-center font-bold text-sm text-black flex-shrink-0`}>
          {rank}
        </div>

        {/* Thumbnail */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-white/10">
          {!imageError ? (
            <img
              src={game.thumbnailUrl || placeholderUrl}
              alt={game.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              {game.name?.substring(0, 2) || 'RB'}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm truncate group-hover:text-cyan-400 transition-colors">
            {game.name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              {formatNumber(game.playing)} playing
            </span>
          </div>
        </div>

        {/* Stats & Change */}
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-gray-500">{formatNumber(game.visits)} visits</div>
          <div className="text-xs">{getChangeIndicator(change)}</div>
        </div>
      </div>

      {/* Quick play on hover */}
      {isHovered && (
        <a
          href={`https://www.roblox.com/games/${game.rootPlaceId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-400 text-white p-2 rounded-lg transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </a>
      )}
    </div>
  );
}

// Skeleton loader
export function GameCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700/50 animate-pulse">
        <div className="flex gap-4 items-start pt-2">
          <div className="w-24 h-24 rounded-xl bg-gray-700"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 bg-gray-700 rounded-lg"></div>
              <div className="h-14 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 rounded-xl p-3 border border-gray-700/50 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-700"></div>
        <div className="w-12 h-12 rounded-lg bg-gray-700"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="w-16 h-8 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
