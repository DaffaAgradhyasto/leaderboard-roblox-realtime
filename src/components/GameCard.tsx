'use client';

import { LeaderboardGame } from '@/types/roblox';
import { formatPlayerCount, formatVoteCount } from '@/lib/roblox-api';
import Image from 'next/image';

interface GameCardProps {
  game: LeaderboardGame;
  showRank?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export default function GameCard({ game, showRank = true, variant = 'default' }: GameCardProps) {
  const handlePlayClick = () => {
    window.open(`https://www.roblox.com/games/${game.placeId}`, '_blank');
  };

  if (variant === 'compact') {
    return (
      <div className="game-card-compact group flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
        {showRank && (
          <div className="rank-badge flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 font-bold text-white text-lg shadow-lg shadow-cyan-500/30">
            {game.rank}
          </div>
        )}
        
        <div className="flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden ring-2 ring-cyan-500/30 group-hover:ring-cyan-400/60 transition-all">
          {game.iconUrl ? (
            <Image
              src={game.iconUrl}
              alt={game.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
            {game.name}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            by {game.creatorName}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-green-400">
              <span className="animate-pulse">●</span>
              {formatPlayerCount(game.playerCount)} playing
            </span>
            <span className="text-xs text-yellow-400">
              {game.rating}% 👍
            </span>
          </div>
        </div>
        
        <button
          onClick={handlePlayClick}
          className="flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-400/50 hover:scale-105"
        >
          Play
        </button>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="game-card-featured group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30">
        {/* Background Image */}
        <div className="absolute inset-0">
          {game.thumbnailUrl && (
            <Image
              src={game.thumbnailUrl}
              alt={game.name}
              fill
              className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        {/* Rank Badge */}
        {showRank && (
          <div className="absolute top-4 left-4 z-10">
            <div className="rank-badge w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 font-black text-white text-2xl shadow-xl shadow-orange-500/50 ring-2 ring-white/20">
              #{game.rank}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 p-6 pt-24">
          <div className="flex items-end gap-4">
            <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden ring-4 ring-cyan-500/50 shadow-xl shadow-cyan-500/30">
              {game.iconUrl ? (
                <Image
                  src={game.iconUrl}
                  alt={game.name}
                  width={96}
                  height={96}
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-4xl">🎮</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white mb-1 truncate group-hover:text-cyan-300 transition-colors">
                {game.name}
              </h2>
              <p className="text-gray-400 mb-2">by {game.creatorName}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                  <span className="animate-pulse mr-1">●</span>
                  {formatPlayerCount(game.playerCount)} playing
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                  {game.rating}% 👍
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                  {game.genre}
                </span>
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-gray-300 text-sm line-clamp-2">
            {game.description || 'No description available'}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>👍 {formatVoteCount(game.totalUpVotes)}</span>
              <span>👎 {formatVoteCount(game.totalDownVotes)}</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                {game.ageRecommendation}
              </span>
            </div>
            
            <button
              onClick={handlePlayClick}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-400/50 hover:scale-105"
            >
              ▶ Play Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="game-card group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {game.thumbnailUrl ? (
          <Image
            src={game.thumbnailUrl}
            alt={game.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <span className="text-6xl">🎮</span>
          </div>
        )}
        
        {/* Rank Badge */}
        {showRank && (
          <div className="absolute top-2 left-2">
            <div className={`rank-badge w-10 h-10 flex items-center justify-center rounded-lg font-bold text-white text-lg shadow-lg ${
              game.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-yellow-500/50' :
              game.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 shadow-gray-400/50' :
              game.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 shadow-amber-600/50' :
              'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30'
            }`}>
              {game.rank}
            </div>
          </div>
        )}
        
        {/* Player Count Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-green-400 text-xs font-medium">
          <span className="animate-pulse mr-1">●</span>
          {formatPlayerCount(game.playerCount)}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden ring-2 ring-cyan-500/30">
            {game.iconUrl ? (
              <Image
                src={game.iconUrl}
                alt={game.name}
                width={48}
                height={48}
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-xl">🎮</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
              {game.name}
            </h3>
            <p className="text-sm text-gray-400 truncate">
              by {game.creatorName}
            </p>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs font-medium">
              {game.rating}% 👍
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs font-medium">
              {game.genre}
            </span>
          </div>
          
          <button
            onClick={handlePlayClick}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm hover:from-green-400 hover:to-emerald-500 transition-all shadow-md shadow-green-500/30 hover:shadow-green-400/50"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
