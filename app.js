const PRIMARY_API = "https://api.consumet.org/anime/gogoanime";
const PROXY_API = "https://corsproxy.io/?" + encodeURIComponent("https://api.consumet.org/anime/gogoanime");

// Fallback anime dataset if external endpoints are temporarily blocked
const fallbackData = [
  {
    id: "battle-through-the-heavens-season-5",
    title: "Battle Through The Heavens (Season 5)",
    image: "https://picsum.photos/id/10/300/400",
    episodeNumber: 102
  },
  {
    id: "soul-land-2",
    title: "Soul Land 2: The Peerless Tang Sect",
    image: "https://picsum.photos/id/11/300/400",
    episodeNumber: 60
  },
  {
    id: "perfect-world",
    title: "Perfect World (Wanmei Shijie)",
    image: "https://picsum.photos/id/12/300/400",
    episodeNumber: 175
  },
  {
    id: "swallowed-star-season-4",
    title: "Swallowed Star (Season 4)",
    image: "https://picsum.photos/id/13/300/400",
    episodeNumber: 130
  },
  {
    id: "renegade-immortal",
    title: "Renegade Immortal (Xian Ni)",
    image: "https://picsum.photos/id/14/300/400",
    episodeNumber: 48
  },
  {
    id: "against-the-gods",
    title: "Against The Gods",
    image: "https://picsum.photos/id/15/300/400",
    episodeNumber: 32
  }
];

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

async function fetchCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  renderHistory();
  grid.innerHTML = '<p class="col-span-full text-center text-gray-400 py-10">Loading catalog...</p>';

  try {
    let res = await fetch(`${PRIMARY_API}/top-airing`).catch(() => null);
    if (!res || !res.ok) {
      res = await fetch(`${PROXY_API}/top-airing`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        renderGrid(data.results);
        return;
      }
    }
    
    // Use fallback data if remote APIs fail or respond empty
    renderGrid(fallbackData);
  } catch (err) {
    renderGrid(fallbackData);
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

document.getElementById('search-input')?.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length < 2) {
    if (query.length === 0) fetchCatalog();
    return;
  }

  try {
    let res = await fetch(`${PRIMARY_API}/${encodeURIComponent(query)}`).catch(() => null);
    if (!res || !res.ok) {
      res = await fetch(`${PROXY_API}/${encodeURIComponent(query)}`).catch(() => null);
    }
    if (res && res.ok) {
      const data = await res.json();
      renderGrid(data.results || []);
    }
  } catch (err) {
    console.error(err);
  }
});

fetchCatalog();
