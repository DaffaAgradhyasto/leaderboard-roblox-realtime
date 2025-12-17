const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Cache untuk menyimpan data sementara
let cache = {
  trending: { data: null, timestamp: 0 },
  topPlaying: { data: null, timestamp: 0 }
};

const CACHE_DURATION = 30000; // 30 detik

// Data contoh untuk fallback
const sampleGames = [
  { placeId: 920587237, name: "Adopt Me!", playerCount: 245678, totalUpVotes: 5234567, totalDownVotes: 123456, creatorName: "DreamCraft", creatorType: "Group" },
  { placeId: 189807, name: "Natural Disaster Survival", playerCount: 189234, totalUpVotes: 3456789, totalDownVotes: 89012, creatorName: "Stickmasterluke", creatorType: "User" },
  { placeId: 606849621, name: "Jailbreak", playerCount: 156789, totalUpVotes: 4567890, totalDownVotes: 234567, creatorName: "Badimo", creatorType: "Group" },
  { placeId: 142823291, name: "Murder Mystery 2", playerCount: 134567, totalUpVotes: 2345678, totalDownVotes: 156789, creatorName: "Nikilis", creatorType: "User" },
  { placeId: 6284583030, name: "Pet Simulator X", playerCount: 123456, totalUpVotes: 3456789, totalDownVotes: 123456, creatorName: "BIG Games", creatorType: "Group" },
  { placeId: 2753915549, name: "Blox Fruits", playerCount: 112345, totalUpVotes: 4234567, totalDownVotes: 234567, creatorName: "Gamer Robot Inc", creatorType: "Group" },
  { placeId: 4924922222, name: "Brookhaven", playerCount: 98765, totalUpVotes: 3123456, totalDownVotes: 123456, creatorName: "Wolfpaq", creatorType: "Group" },
  { placeId: 537413528, name: "Build A Boat For Treasure", playerCount: 87654, totalUpVotes: 2345678, totalDownVotes: 98765, creatorName: "Chillz Studios", creatorType: "Group" },
  { placeId: 8737602449, name: "Pls Donate", playerCount: 76543, totalUpVotes: 1876543, totalDownVotes: 87654, creatorName: "Hazem", creatorType: "User" },
  { placeId: 6516141723, name: "DOORS", playerCount: 65432, totalUpVotes: 2876543, totalDownVotes: 123456, creatorName: "LSPLASH", creatorType: "User" },
  { placeId: 1537690962, name: "Bee Swarm Simulator", playerCount: 54321, totalUpVotes: 1987654, totalDownVotes: 76543, creatorName: "Onett", creatorType: "User" },
  { placeId: 6872274481, name: "Tower of Hell", playerCount: 43210, totalUpVotes: 1654321, totalDownVotes: 54321, creatorName: "YXCeptional Studios", creatorType: "Group" }
];

// Fungsi untuk mengambil data dari Roblox API
async function fetchRobloxData(endpoint) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Roblox data:', error);
    throw error;
  }
}

// Fungsi untuk mendapatkan data sample dengan variasi
function getSampleGames(sortBy = 'playerCount') {
  const games = [...sampleGames];
  
  // Tambahkan variasi random pada player count untuk simulasi real-time
  const gamesWithVariation = games.map(game => ({
    ...game,
    playerCount: game.playerCount + Math.floor(Math.random() * 10000) - 5000
  }));
  
  // Sort berdasarkan kriteria
  if (sortBy === 'playerCount') {
    gamesWithVariation.sort((a, b) => b.playerCount - a.playerCount);
  } else if (sortBy === 'trending') {
    // Untuk trending, gunakan kombinasi player count dan votes
    gamesWithVariation.sort((a, b) => {
      const scoreA = (a.playerCount * 0.7) + (a.totalUpVotes * 0.3);
      const scoreB = (b.playerCount * 0.7) + (b.totalUpVotes * 0.3);
      return scoreB - scoreA;
    });
  }
  
  return { games: gamesWithVariation };
}

// Endpoint untuk mendapatkan game trending
app.get('/api/trending', async (req, res) => {
  try {
    const now = Date.now();
    
    // Cek cache
    if (cache.trending.data && (now - cache.trending.timestamp) < CACHE_DURATION) {
      return res.json(cache.trending.data);
    }

    let gamesData;
    
    try {
      // Coba mengambil data dari Roblox API untuk game yang sedang trending
      gamesData = await fetchRobloxData(
        'https://games.roblox.com/v1/games/sorts?model.sortToken=&sortPosition=0&model.gameSetTargetId=1&model.timeFilter=0&model.genre=0&model.exclusiveStartId=0&model.sortId=5&model.gameSetTypeId=1&model.pageId=1&model.maxRows=50&model.isAscending=false'
      );
    } catch (apiError) {
      console.log('Menggunakan sample data karena API tidak tersedia');
      // Gunakan sample data jika API gagal
      gamesData = getSampleGames('trending');
    }

    // Format data untuk frontend
    const formattedData = {
      games: gamesData.games ? gamesData.games.map(game => ({
        id: game.placeId || game.universeId,
        name: game.name,
        playerCount: game.playerCount || 0,
        totalUpVotes: game.totalUpVotes || 0,
        totalDownVotes: game.totalDownVotes || 0,
        imageToken: game.imageToken || '',
        creatorId: game.creatorId || 0,
        creatorName: game.creatorName || '',
        creatorType: game.creatorType || 'User'
      })) : [],
      timestamp: new Date().toISOString()
    };

    // Update cache
    cache.trending.data = formattedData;
    cache.trending.timestamp = now;

    res.json(formattedData);
  } catch (error) {
    console.error('Error in /api/trending:', error);
    res.status(500).json({ error: 'Failed to fetch trending games', message: error.message });
  }
});

// Endpoint untuk mendapatkan game dengan pemain terbanyak saat ini
app.get('/api/top-playing', async (req, res) => {
  try {
    const now = Date.now();
    
    // Cek cache
    if (cache.topPlaying.data && (now - cache.topPlaying.timestamp) < CACHE_DURATION) {
      return res.json(cache.topPlaying.data);
    }

    let gamesData;
    
    try {
      // Mengambil data game dengan pemain terbanyak
      gamesData = await fetchRobloxData(
        'https://games.roblox.com/v1/games/sorts?model.sortToken=&sortPosition=0&model.gameSetTargetId=1&model.timeFilter=0&model.genre=0&model.exclusiveStartId=0&model.sortId=1&model.gameSetTypeId=1&model.pageId=1&model.maxRows=50&model.isAscending=false'
      );
    } catch (apiError) {
      console.log('Menggunakan sample data karena API tidak tersedia');
      // Gunakan sample data jika API gagal
      gamesData = getSampleGames('playerCount');
    }

    // Format data untuk frontend
    const formattedData = {
      games: gamesData.games ? gamesData.games.map(game => ({
        id: game.placeId || game.universeId,
        name: game.name,
        playerCount: game.playerCount || 0,
        totalUpVotes: game.totalUpVotes || 0,
        totalDownVotes: game.totalDownVotes || 0,
        imageToken: game.imageToken || '',
        creatorId: game.creatorId || 0,
        creatorName: game.creatorName || '',
        creatorType: game.creatorType || 'User'
      })) : [],
      timestamp: new Date().toISOString()
    };

    // Update cache
    cache.topPlaying.data = formattedData;
    cache.topPlaying.timestamp = now;

    res.json(formattedData);
  } catch (error) {
    console.error('Error in /api/top-playing:', error);
    res.status(500).json({ error: 'Failed to fetch top playing games', message: error.message });
  }
});

// Endpoint untuk mendapatkan detail game
app.get('/api/game/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const gameDetails = await fetchRobloxData(
      `https://games.roblox.com/v1/games/multiget-place-details?placeIds=${gameId}`
    );

    res.json(gameDetails);
  } catch (error) {
    console.error('Error in /api/game/:id:', error);
    res.status(500).json({ error: 'Failed to fetch game details', message: error.message });
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('Tekan Ctrl+C untuk menghentikan server');
});
