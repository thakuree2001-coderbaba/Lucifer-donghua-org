const API_BASE = "https://api.consumet.org/anime/gogoanime";

// Render Continue Watching section from LocalStorage
function renderHistory() {
  const historyContainer = document.getElementById('history-section');
  if (!historyContainer) return;

  const history = JSON.parse(localStorage.getItem('animeHistory') || '[]');
  if (history.length === 0) {
    historyContainer.innerHTML = '';
    return;
  }

  let html = `
    <div class="mb-8">
      <h2 class="text-base sm:text-lg font-bold text-gray-200 mb-3 flex items-center gap-2">
        <span>🕒</span> Continue Watching
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
  `;

  history.forEach(item => {
    html += `
      <div onclick="window.location.href='watch.html?animeId=${encodeURIComponent(item.animeId)}&ep=${item.epNumber}'" 
           class="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition cursor-pointer flex flex-col group">
        <div class="relative aspect-[3/4] w-full bg-gray-800 overflow-hidden">
          <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">
          <span class="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">Ep ${item.epNumber}</span>
        </div>
        <div class="p-2 sm:p-3">
          <h3 class="font-medium text-xs sm:text-sm text-gray-200 line-clamp-1">${item.title}</h3>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  historyContainer.innerHTML = html;
}

// Fetch Latest Updated & Trending Anime/Donghua automatically
async function fetchCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  renderHistory();
  grid.innerHTML = '<p class="col-span-full text-center text-gray-400 py-10">Loading latest releases...</p>';

  try {
    const [recentRes, topRes] = await Promise.all([
      fetch(`${API_BASE}/recent-episodes`),
      fetch(`${API_BASE}/top-airing`)
    ]);

    const recentData = await recentRes.json();
    const topData = await topRes.json();

    // Merge recent releases and top airing items
    const combined = [...(recentData.results || []), ...(topData.results || [])];
    const uniqueItems = Array.from(new Map(combined.map(item => [item.id, item])).values());

    renderGrid(uniqueItems);
  } catch (err) {
    grid.innerHTML = '<p class="col-span-full text-center text-red-500 py-10">Failed to load content. Please try again.</p>';
  }
}

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  grid.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition cursor-pointer flex flex-col group shadow-md";
    card.innerHTML = `
      <div class="relative aspect-[3/4] w-full bg-gray-800 overflow-hidden">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">
        ${item.episodeNumber ? `<span class="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">EP ${item.episodeNumber}</span>` : ''}
      </div>
      <div class="p-2.5 sm:p-3 flex-grow flex items-center">
        <h3 class="font-medium text-xs sm:text-sm text-gray-200 line-clamp-2 leading-tight">${item.title}</h3>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `watch.html?animeId=${encodeURIComponent(item.id)}`;
    });
    grid.appendChild(card);
  });
}

// Responsive Search Handler
document.getElementById('search-input')?.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length < 2) {
    if (query.length === 0) fetchCatalog();
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(query)}`);
    const data = await res.json();
    renderGrid(data.results || []);
  } catch (err) {
    console.error(err);
  }
});

fetchCatalog();
