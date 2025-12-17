// Konfigurasi
const API_BASE_URL = window.location.origin;
const AUTO_REFRESH_INTERVAL = 30000; // 30 detik
let autoRefreshTimer = null;
let currentTab = 'trending';

// State management
const state = {
    trending: { games: [], loading: false },
    'top-playing': { games: [], loading: false }
};

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeRefresh();
    loadData('trending');
    startAutoRefresh();
});

// Inisialisasi tab switching
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

// Switch antar tab
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update button states
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content visibility
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    
    // Load data jika belum ada
    if (state[tabName].games.length === 0) {
        loadData(tabName);
    }
}

// Inisialisasi refresh controls
function initializeRefresh() {
    const refreshBtn = document.getElementById('refreshBtn');
    const autoRefreshCheckbox = document.getElementById('autoRefresh');
    
    refreshBtn.addEventListener('click', () => {
        loadData(currentTab, true);
    });
    
    autoRefreshCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            startAutoRefresh();
        } else {
            stopAutoRefresh();
        }
    });
}

// Mulai auto-refresh
function startAutoRefresh() {
    stopAutoRefresh(); // Clear existing timer
    autoRefreshTimer = setInterval(() => {
        const autoRefreshCheckbox = document.getElementById('autoRefresh');
        if (autoRefreshCheckbox.checked) {
            loadData(currentTab, false);
        }
    }, AUTO_REFRESH_INTERVAL);
}

// Stop auto-refresh
function stopAutoRefresh() {
    if (autoRefreshTimer) {
        clearInterval(autoRefreshTimer);
        autoRefreshTimer = null;
    }
}

// Load data dari API
async function loadData(type, showLoading = true) {
    const endpoint = type === 'trending' ? '/api/trending' : '/api/top-playing';
    const loadingElementId = type === 'trending' ? 'trendingLoading' : 'topPlayingLoading';
    const gamesContainerId = type === 'trending' ? 'trendingGames' : 'topPlayingGames';
    const loadingElement = document.getElementById(loadingElementId);
    const gamesContainer = document.getElementById(gamesContainerId);
    
    try {
        if (showLoading) {
            state[type].loading = true;
            if (loadingElement) loadingElement.style.display = 'block';
            if (gamesContainer) gamesContainer.innerHTML = '';
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        state[type].games = data.games || [];
        state[type].loading = false;
        
        renderGames(type, state[type].games);
        updateLastUpdateTime(data.timestamp);
        
        if (loadingElement) loadingElement.style.display = 'none';
        
    } catch (error) {
        console.error('Error loading data:', error);
        state[type].loading = false;
        if (loadingElement) loadingElement.style.display = 'none';
        
        if (gamesContainer) {
            gamesContainer.innerHTML = `
                <div class="error-message">
                    <h3>❌ Gagal memuat data</h3>
                    <p>${error.message}</p>
                    <button onclick="loadData('${type}', true)" style="margin-top: 15px; padding: 10px 20px; border: none; background: white; color: #ff4444; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        Coba Lagi
                    </button>
                </div>
            `;
        }
    }
}

// Render games ke dalam grid
function renderGames(type, games) {
    const containerId = type === 'trending' ? 'trendingGames' : 'topPlayingGames';
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container not found: ${containerId}`);
        return;
    }
    
    if (!games || games.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h3>Tidak ada data game tersedia</h3>
                <p style="color: #666; margin-top: 10px;">Silakan coba lagi nanti</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = games.map((game, index) => createGameCard(game, index + 1)).join('');
}

// Buat card untuk satu game
function createGameCard(game, rank) {
    const playerCount = formatNumber(game.playerCount);
    const upVotes = formatNumber(game.totalUpVotes);
    const downVotes = formatNumber(game.totalDownVotes);
    const likeRatio = calculateLikeRatio(game.totalUpVotes, game.totalDownVotes);
    
    // Generate image URL dari Roblox
    const imageUrl = game.imageToken 
        ? `https://tr.rbxcdn.com/v1/games/icons/placeholder/${game.imageToken}/150/150/Image/Png`
        : '';
    
    return `
        <div class="game-card" onclick="openGame(${game.id})">
            <div class="game-image-container">
                <div class="game-rank">#${rank}</div>
                ${imageUrl 
                    ? `<img src="${imageUrl}" alt="${escapeHtml(game.name)}" class="game-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                       <div class="game-image placeholder" style="display: none;">🎮</div>`
                    : `<div class="game-image placeholder">🎮</div>`
                }
            </div>
            <div class="game-info">
                <h3 class="game-name">${escapeHtml(game.name)}</h3>
                <div class="game-stats">
                    <div class="stat-row">
                        <span class="stat-label">👥 Pemain Aktif</span>
                        <span class="stat-value players-count">${playerCount}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">👍 Suka</span>
                        <span class="stat-value">${upVotes}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">📊 Rating</span>
                        <span class="stat-value">${likeRatio}%</span>
                    </div>
                </div>
                <div class="game-creator">
                    Dibuat oleh: <span class="creator-name">${escapeHtml(game.creatorName || 'Unknown')}</span>
                </div>
            </div>
        </div>
    `;
}

// Format angka dengan pemisah ribuan
function formatNumber(num) {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Hitung persentase like ratio
function calculateLikeRatio(upVotes, downVotes) {
    const total = upVotes + downVotes;
    if (total === 0) return '0';
    return Math.round((upVotes / total) * 100);
}

// Escape HTML untuk mencegah XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Update waktu update terakhir
function updateLastUpdateTime(timestamp) {
    const lastUpdateElement = document.getElementById('lastUpdate');
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    lastUpdateElement.textContent = `Terakhir diperbarui: ${formattedTime}`;
}

// Buka halaman game di Roblox
function openGame(gameId) {
    window.open(`https://www.roblox.com/games/${gameId}`, '_blank');
}

// Cleanup saat halaman ditutup
window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});
