// Popular Roblox games data for fallback/demo purposes
// This data is used when the Roblox API is unavailable

export interface MockGameData {
  name: string;
  playing: number;
  visits: number;
  favorites: number;
}

export const POPULAR_GAMES: MockGameData[] = [
  { name: 'Blox Fruits', playing: 1250000, visits: 45000000000, favorites: 12500000 },
  { name: 'Brookhaven RP', playing: 890000, visits: 35000000000, favorites: 9800000 },
  { name: 'Tower of Hell', playing: 450000, visits: 22000000000, favorites: 5500000 },
  { name: 'Murder Mystery 2', playing: 380000, visits: 18000000000, favorites: 4200000 },
  { name: 'Adopt Me!', playing: 350000, visits: 32000000000, favorites: 15000000 },
  { name: 'Arsenal', playing: 320000, visits: 8000000000, favorites: 3800000 },
  { name: 'Jailbreak', playing: 280000, visits: 7000000000, favorites: 4500000 },
  { name: 'Doors', playing: 250000, visits: 4500000000, favorites: 2800000 },
  { name: 'Pet Simulator X', playing: 230000, visits: 15000000000, favorites: 6200000 },
  { name: 'Anime Fighting Simulator', playing: 200000, visits: 3500000000, favorites: 2100000 },
  { name: 'King Legacy', playing: 185000, visits: 3000000000, favorites: 1900000 },
  { name: 'Shindo Life', playing: 170000, visits: 2800000000, favorites: 2400000 },
  { name: 'Da Hood', playing: 160000, visits: 2500000000, favorites: 1700000 },
  { name: 'Natural Disaster Survival', playing: 150000, visits: 3200000000, favorites: 3100000 },
  { name: 'Bee Swarm Simulator', playing: 140000, visits: 2100000000, favorites: 2500000 },
  { name: 'Build A Boat For Treasure', playing: 130000, visits: 1800000000, favorites: 1600000 },
  { name: 'Piggy', playing: 120000, visits: 2000000000, favorites: 1800000 },
  { name: 'MeepCity', playing: 110000, visits: 16000000000, favorites: 4100000 },
  { name: 'Phantom Forces', playing: 100000, visits: 4000000000, favorites: 2900000 },
  { name: 'Work at a Pizza Place', playing: 95000, visits: 2500000000, favorites: 1500000 },
  { name: 'All Star Tower Defense', playing: 90000, visits: 1500000000, favorites: 1200000 },
  { name: 'Rainbow Friends', playing: 85000, visits: 1200000000, favorites: 950000 },
  { name: 'Combat Warriors', playing: 80000, visits: 800000000, favorites: 600000 },
  { name: 'Theme Park Tycoon 2', playing: 75000, visits: 2000000000, favorites: 1100000 },
  { name: 'Royale High', playing: 70000, visits: 25000000000, favorites: 8500000 },
  { name: 'Tower Defense Simulator', playing: 68000, visits: 2500000000, favorites: 1400000 },
  { name: 'Your Bizarre Adventure', playing: 65000, visits: 1800000000, favorites: 1100000 },
  { name: 'Bedwars', playing: 62000, visits: 5000000000, favorites: 2200000 },
  { name: 'Sonic Speed Simulator', playing: 60000, visits: 1500000000, favorites: 850000 },
  { name: 'Dragon Ball Z Final Stand', playing: 55000, visits: 900000000, favorites: 750000 },
  { name: 'Blade Ball', playing: 53000, visits: 700000000, favorites: 420000 },
  { name: 'Anime Adventures', playing: 50000, visits: 600000000, favorites: 380000 },
  { name: 'The Strongest Battlegrounds', playing: 48000, visits: 500000000, favorites: 320000 },
  { name: 'Rivals', playing: 45000, visits: 400000000, favorites: 280000 },
  { name: 'Lumber Tycoon 2', playing: 42000, visits: 1500000000, favorites: 980000 },
  { name: 'Car Dealership Tycoon', playing: 40000, visits: 600000000, favorites: 450000 },
  { name: 'Retail Tycoon 2', playing: 38000, visits: 800000000, favorites: 520000 },
  { name: 'Zombie Attack', playing: 35000, visits: 700000000, favorites: 410000 },
  { name: 'Demonfall', playing: 33000, visits: 500000000, favorites: 350000 },
  { name: 'Bubble Gum Simulator', playing: 30000, visits: 4500000000, favorites: 2100000 },
  { name: 'Ninja Legends', playing: 28000, visits: 1200000000, favorites: 700000 },
  { name: 'Survive the Killer', playing: 26000, visits: 900000000, favorites: 550000 },
  { name: 'World Zero', playing: 24000, visits: 400000000, favorites: 280000 },
  { name: 'Saber Simulator', playing: 22000, visits: 1100000000, favorites: 620000 },
  { name: 'A Bizarre Day', playing: 20000, visits: 800000000, favorites: 480000 },
  { name: 'My Restaurant', playing: 18000, visits: 300000000, favorites: 220000 },
  { name: 'Anime Dimensions', playing: 16000, visits: 500000000, favorites: 310000 },
  { name: 'King Piece', playing: 15000, visits: 600000000, favorites: 380000 },
  { name: 'Pet Simulator Classic', playing: 14000, visits: 3000000000, favorites: 1500000 },
  { name: 'Ragdoll Engine', playing: 12000, visits: 700000000, favorites: 420000 },
];

// Popular Roblox game universe IDs (real, well-known games)
// Used as fallback when fetching from API
export const POPULAR_UNIVERSE_IDS = [
  2753915549,  // Blox Fruits
  1962086868,  // Tower of Hell
  292439477,   // Phantom Forces
  3260590327,  // Brookhaven RP
  65241,       // Jailbreak (classic)
  2474168535,  // Tower Defense Simulator
  920587237,   // Adopt Me!
  189707,      // Natural Disaster Survival
  1224212277,  // Murder Mystery 2
  286090429,   // Arsenal
  4390690873,  // Pet Simulator X
  4924922222,  // My Restaurant
  17625359063, // Rivals
  6065012721,  // Doors
  5642829052,  // Da Hood
  4668397652,  // Anime Fighting Simulator X
  2073775453,  // King Legacy
  2434855916,  // King Piece
  3009416287,  // Anime Dimensions
  5552218437,  // World Zero
  226620726,   // Bee Swarm Simulator
  2721144847,  // A Bizarre Day
  1320186298,  // Your Bizarre Adventure
  116501225,   // Lumber Tycoon 2
  245662005,   // Shindo Life
  1558468921,  // Build A Boat For Treasure
  3054776683,  // Zombie Attack
  192800,      // MeepCity
  24270354,    // Piggy
  4537602097,  // Rainbow Friends
  5853179255,  // Saber Simulator
  3084826316,  // Survive the Killer
  2961220862,  // Demonfall
  4806019399,  // All Star Tower Defense
  5022159088,  // Car Dealership Tycoon
  2612480355,  // Ninja Legends
  3956818381,  // Blade Ball
  1165772396,  // Bedwars
  2891968218,  // Sonic Speed Simulator
  87666387,    // Theme Park Tycoon 2
  194979152,   // Retail Tycoon 2
  62124643,    // Work at a Pizza Place
  3277302247,  // MM2
  4988235551,  // Combat Warriors
  4872321990,  // Dragon Ball Z: Final Stand
  1261754078,  // Royale High
  3527629287,  // The Strongest Battlegrounds
  379766425,   // Bubble Gum Simulator
  4748698679,  // Anime Adventures
];
