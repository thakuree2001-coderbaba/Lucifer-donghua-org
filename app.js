const API_BASE = "https://api.consumet.org/anime/gogoanime";
const PROXY_BASE = "https://corsproxy.io/?" + encodeURIComponent(API_BASE);

async function fetchDonghuaData(endpoint) {
  try {
    let res = await fetch(`${API_BASE}/${endpoint}`).catch(() => null);
    if (!res || !res.ok) {
      res = await fetch(`${PROXY_BASE}/${endpoint}`).catch(() => null);
    }
    if (res && res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("API fetch error:", e);
  }
  return null;
}

function createCard(item) {
  const animeId = item.id || item.episodeId;
  const title = item.title || "Donghua Series";
  const image = item.image || "https://via.placeholder.com/300x400";
  const epText = item.episodeNumber ? `Ep ${item.episodeNumber}` : "Latest";

  return `
    <a href="watch.html?animeId=${animeId}" class="group relative bg-card rounded-md overflow-hidden border border-gray-800 hover:border-red-600 transition">
      <div class="relative aspect-[3/4]">
        <img src="${image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">
        <span class="absolute top-1 right-1 badge-type text-[9px] px-1 rounded">DONGHUA</span>
        <span class="absolute bottom-1 right-1 badge-sub text-[9px] px-1 rounded">Sub</span>
        <span class="absolute bottom-1 left-1 text-[9px] bg-black/80 text-gray-200 px-1 rounded">${epText}</span>
      </div>
      <div class="p-1.5">
        <h3 class="text-xs font-semibold line-clamp-2 text-gray-200 group-hover:text-red-500">${title}</h3>
      </div>
    </a>
  `;
}

async function loadDynamicCatalog() {
  const popularContainer = document.getElementById('popular-grid');
  const recentContainer = document.getElementById('recent-grid');

  // Load Popular Donghua
  if (popularContainer) {
    const popularData = await fetchDonghuaData("top-airing?page=1");
    if (popularData && popularData.results && popularData.results.length > 0) {
      popularContainer.innerHTML = popularData.results.slice(0, 6).map(createCard).join('');
    }
  }

  // Load Recent Releases
  if (recentContainer) {
    const recentData = await fetchDonghuaData("recent-episodes?page=1");
    if (recentData && recentData.results && recentData.results.length > 0) {
      recentContainer.innerHTML = recentData.results.slice(0, 12).map(createCard).join('');
    }
  }
}

document.addEventListener('DOMContentLoaded', loadDynamicCatalog);
