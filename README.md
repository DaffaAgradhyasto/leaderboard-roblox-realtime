# 🎮 Roblox Leaderboard - Real-Time Game Rankings

A futuristic, real-time leaderboard application for tracking the most popular Roblox games. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Roblox Leaderboard](https://img.shields.io/badge/Roblox-Leaderboard-00B2FF?style=for-the-badge&logo=roblox&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ✨ Features

- **🔴 Real-Time Updates**: Data refreshes automatically every 60 seconds
- **📊 Multiple Categories**: 
  - Top Playing Now - Games with most concurrent players
  - Trending - Games rising in popularity
  - Most Visited - All-time most visits
  - Top Rated - Highest rated games
  - Top Earning - Highest revenue games
- **🎨 Futuristic Design**: Cyberpunk-inspired UI with glowing effects and animations
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast**: Server-side rendering with incremental static regeneration
- **🔗 Direct Links**: Click any game to play it on Roblox

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DaffaAgradhyasto/leaderboard-roblox-realtime.git
cd leaderboard-roblox-realtime
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── games/
│   │       └── route.ts    # API endpoint for fetching game data
│   ├── globals.css         # Global styles with futuristic effects
│   ├── layout.tsx          # Root layout with particles
│   └── page.tsx            # Main page component
├── components/
│   ├── CategoryTabs.tsx    # Category selection tabs
│   ├── GameCard.tsx        # Individual game card component
│   ├── Leaderboard.tsx     # Main leaderboard component
│   └── useLeaderboard.ts   # Custom hook for data fetching
├── lib/
│   └── roblox-api.ts       # Roblox API integration
└── types/
    └── game.ts             # TypeScript type definitions
```

## 🔧 API Reference

### GET /api/games

Fetches the game leaderboard data.

**Query Parameters:**
- `category` (optional): One of `top-playing-now`, `trending`, `top-visited`, `top-rated`, `top-earning`. Default: `top-playing-now`
- `limit` (optional): Number of games to fetch (max 100). Default: `50`

**Response:**
```json
{
  "success": true,
  "category": "top-playing-now",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "count": 50,
  "data": [
    {
      "rank": 1,
      "game": {
        "universeId": 2753915549,
        "name": "Blox Fruits",
        "rootPlaceId": 2753915549,
        "playing": 1250000,
        "visits": 45000000000,
        "thumbnailUrl": "..."
      },
      "change": 0
    }
  ]
}
```

## 🎨 Design Features

- **Cyber Grid Background**: Animated grid overlay that moves continuously
- **Floating Particles**: Colorful particles floating upward for depth
- **Glowing Effects**: Neon-style glowing text and borders
- **Gradient Cards**: Smooth color transitions on game cards
- **Live Indicators**: Pulsing green dots showing real-time status
- **Smooth Animations**: Hover effects and transitions throughout

## 📝 License

This project is for educational purposes. Not affiliated with Roblox Corporation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

This is an unofficial fan project. All Roblox data is sourced from their public APIs. This project is not affiliated with, endorsed by, or connected to Roblox Corporation.
