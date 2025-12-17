# Roblox Charts - Real-time Game Leaderboard 🎮

A futuristic, full-stack real-time leaderboard application for tracking trending and popular Roblox games. Built with Next.js, TypeScript, and Tailwind CSS.

![Roblox Charts](https://img.shields.io/badge/Roblox-Charts-00A2FF?style=for-the-badge&logo=roblox&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **🔴 Real-time Updates**: Data refreshes automatically every 60 seconds
- **📊 Multiple Views**: Trending games and Top Playing Now
- **🎨 Futuristic Design**: Year 999999999999+ aesthetic with animated background
- **📱 Responsive**: Works on all devices (mobile, tablet, desktop)
- **⚡ Fast**: Built with Next.js App Router for optimal performance
- **🔗 Direct Play**: Click to play any game directly on Roblox

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
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

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── games/
│   │       ├── trending/     # Trending games API
│   │       └── top-playing/  # Top playing games API
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── AnimatedBackground.tsx # Particle animation background
│   ├── Footer.tsx            # Footer component
│   ├── GameCard.tsx          # Game card component
│   ├── Header.tsx            # Header component
│   └── Leaderboard.tsx       # Main leaderboard component
├── lib/
│   └── roblox-api.ts         # Roblox API integration
└── types/
    └── roblox.ts             # TypeScript types
```

## 🔌 API Endpoints

### GET /api/games/trending
Returns trending Roblox games.

**Query Parameters:**
- `limit` (optional): Number of games to return (default: 50, max: 100)

### GET /api/games/top-playing
Returns games sorted by current player count.

**Query Parameters:**
- `limit` (optional): Number of games to return (default: 50, max: 100)

## 📖 Data Sources

This application fetches data from official Roblox public APIs:
- Games API (`games.roblox.com`)
- Thumbnails API (`thumbnails.roblox.com`)

**Note:** This is an unofficial application. Data may have slight delays compared to the official Roblox charts.

## 🎨 Design Features

- **Animated Particle Background**: Dynamic canvas-based particle system
- **Glassmorphism Effects**: Modern glass-like UI elements
- **Gradient Accents**: Cyan, purple, and pink gradient theme
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Neon Glow Effects**: Futuristic lighting on cards and buttons
- **Live Indicator**: Animated live status with pulse effect

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Font**: Geist (Sans & Mono)
- **Deployment**: Vercel (recommended)

## 📝 License

This project is for educational purposes. Roblox and the Roblox logo are trademarks of Roblox Corporation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ for the Roblox community
