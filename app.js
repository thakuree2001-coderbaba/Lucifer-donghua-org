const API_BASE = "https://api.consumet.org/anime/gogoanime";

// Search and list latest anime automatically from the API
async function fetchTrendingAnime() {
  const grid = document.getElementById('catalog-grid');
  if(!grid) return;
  
  grid.innerHTML = '<p class="col-span-full text-center text-gray-400 py-10">Loading anime catalog...</p>';

  try {
    const res = await fetch(`${API_BASE}/top-airing`);
    const data = await res.json();
    renderGrid(data.results);
  } catch (err) {
    grid.innerHTML = '<p class="col-span-full text-center text-red-500 py-10">Failed to load anime. Please try again later.</p>';
  }
}

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  if(!grid) return;
  grid.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition cursor-pointer flex flex-col";
    card.innerHTML = `
      <div class="relative aspect-[3/4] w-full bg-gray-800">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy">
      </div>
      <div class="p-3 flex-grow flex items-center">
        <h3 class="font-medium text-xs sm:text-sm text-gray-200 line-clamp-2 leading-tight">${item.title}</h3>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `watch.html?animeId=${encodeURIComponent(item.id)}`;
    });
    grid.appendChild(card);
  });
}

// Handle live search bar
document.getElementById('search-input')?.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length < 2) return;
  
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(query)}`);
    const data = await res.json();
    renderGrid(data.results);
  } catch (err) {
    console.error(err);
  }
});

fetchTrendingAnime();
