export default function Footer() {
  return (
    <footer className="relative z-50 w-full mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-cyan-500/20 pt-8">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎮</span>
            <div>
              <p className="font-bold text-white">Roblox Charts</p>
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} • Real-time Leaderboard
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.roblox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              Roblox.com
            </a>
            <a
              href="https://www.roblox.com/charts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              Official Charts
            </a>
            <a
              href="https://developer.roblox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              Developer Hub
            </a>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Built with</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-slate-800 text-xs text-cyan-400 border border-cyan-500/20">
                Next.js
              </span>
              <span className="px-2 py-1 rounded bg-slate-800 text-xs text-purple-400 border border-purple-500/20">
                Tailwind
              </span>
              <span className="px-2 py-1 rounded bg-slate-800 text-xs text-pink-400 border border-pink-500/20">
                TypeScript
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            This is an unofficial leaderboard. Roblox and the Roblox logo are trademarks of Roblox Corporation.
            Data is fetched from public Roblox APIs and may have slight delays.
          </p>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
    </footer>
  );
}
