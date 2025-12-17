import { Leaderboard } from '@/components/Leaderboard';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 text-center">
          {/* Logo/Title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50"></div>
              <svg className="relative w-16 h-16 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent glow-cyan">
                ROBLOX
              </span>
              <span className="text-white"> </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent glow-purple">
                CHARTS
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Real-time leaderboard tracking the most popular Roblox games.
            <br />
            <span className="text-cyan-400">Updated every minute</span> with live player counts.
          </p>

          {/* Futuristic decoration lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-500"></div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          {/* Stats banner */}
          <div className="inline-flex items-center gap-6 bg-gray-900/50 backdrop-blur-sm rounded-full px-8 py-3 border border-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">LIVE DATA</span>
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="text-gray-400">
              <span className="font-mono text-cyan-400">50+</span> Games Tracked
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="text-gray-400">
              <span className="font-mono text-purple-400">60s</span> Refresh Rate
            </div>
          </div>
        </div>
      </header>

      {/* Leaderboard */}
      <Leaderboard />

      {/* Footer */}
      <footer className="relative mt-16 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm">
              <p>
                Data sourced from the official Roblox API. This is an unofficial fan project.
              </p>
              <p className="mt-1">
                © {new Date().getFullYear()} Roblox Charts • Not affiliated with Roblox Corporation
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.roblox.com/charts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2"
              >
                <span>Official Roblox Charts</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50"></div>
      </footer>
    </main>
  );
}
