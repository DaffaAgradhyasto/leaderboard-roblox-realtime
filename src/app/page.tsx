import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Leaderboard from '@/components/Leaderboard';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
              🌟 Real-time Data • Updated Every Minute
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Roblox Game
            </span>
            <br />
            <span className="text-white">Leaderboard</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the most popular and trending Roblox games in real-time.
            Data sourced directly from Roblox APIs.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Data Source', value: 'Roblox API', icon: '🔗' },
            { label: 'Update Interval', value: '60 seconds', icon: '⏱️' },
            { label: 'Coverage', value: 'Global', icon: '🌍' },
            { label: 'Games Tracked', value: '50+', icon: '🎮' },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 text-center hover:border-cyan-400/40 transition-all"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-cyan-400 font-bold">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <Leaderboard />
      </main>

      <Footer />
    </div>
  );
}
