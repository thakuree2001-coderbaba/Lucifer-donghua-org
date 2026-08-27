const mediaList = [
  {
    title: "Battle Through The Heavens (Season 5)",
    episode: "Ep 102",
    poster: "https://images.justwatch.com/poster/305886981/s332/battle-through-the-heavens.webp",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Soul Land 2: The Peerless Tang Sect",
    episode: "Ep 60",
    poster: "https://m.media-amazon.com/images/M/MV5BN2FlYWRhZTUtYWE0NS00Y2EyLTk4NTctNTFiYTcwYWI0YzExXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Perfect World (Wanmei Shijie)",
    episode: "Ep 175",
    poster: "https://m.media-amazon.com/images/M/MV5BMDRiNTA0YzktM2NhMy00MDM3LTg0OTAtOTcyMDJkYzQ0Y2RhXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Swallowed Star (Season 4)",
    episode: "Ep 130",
    poster: "https://m.media-amazon.com/images/M/MV5BZDkyNWIxMGMtNDlhMi00Y2MwLWEyNWUtOGNlM2I2ZTI3YjU3XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Renegade Immortal (Xian Ni)",
    episode: "Ep 48",
    poster: "https://m.media-amazon.com/images/M/MV5BZDU1NzM4ZDItOTM1MC00NmE4LThjYTUtNDc0MDAxNWE0NTIxXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Against The Gods",
    episode: "Ep 32",
    poster: "https://m.media-amazon.com/images/M/MV5BZTFiMjhhN2EtOTIxNi00YWQ1LThjYmItYTA3YTIxY2YxMzg0XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Throne of Seal",
    episode: "Ep 115",
    poster: "https://m.media-amazon.com/images/M/MV5BYzA2NzRhYzAtOTg1ZS00MTg0LWI1ZTAtYY1NDY0YTg2OWM4XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "A Will Eternal (Season 3)",
    episode: "Ep 110",
    poster: "https://m.media-amazon.com/images/M/MV5BMjA1OTU5N2YtYTI3Mi00NmVhLTgwYTMtN2I2N2Y1M2IzNDNmXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Jade Dynasty (Season 2)",
    episode: "Ep 26",
    poster: "https://m.media-amazon.com/images/M/MV5BNTBmYzI2N2QtZTAxMC00ODgwLTg0NjQtY2U4NWExYjUxZDc0XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Martial Master",
    episode: "Ep 410",
    poster: "https://m.media-amazon.com/images/M/MV5BYzJkYzg3NDktNWJkZi00ZDY0LThmZTgtZjQ3YzA1ZDQ1NWYzXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Stellar Transformation",
    episode: "Ep 80",
    poster: "https://m.media-amazon.com/images/M/MV5BZTljNzk3NDQtMWIzMi00OGQ1LTllMDgtNGE1YTU4YzQxNzY1XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Apotheosis",
    episode: "Ep 75",
    poster: "https://m.media-amazon.com/images/M/MV5BNzdmZTVjYjAtZDhlNi00YWMwLTg5YTItZTBiNWJkYmFiZDA5XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-500 transition duration-200 cursor-pointer flex flex-col";
    card.innerHTML = `
      <div class="relative aspect-[3/4] w-full bg-gray-800">
        <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/1f2937/ffffff?text=Donghua'">
        <span class="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">${item.episode}</span>
      </div>
      <div class="p-3 flex-grow flex items-center">
        <h3 class="font-medium text-xs sm:text-sm text-gray-200 line-clamp-2 leading-tight">${item.title}</h3>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `watch.html?url=${encodeURIComponent(item.streamUrl)}&title=${encodeURIComponent(item.title)}`;
    });
    grid.appendChild(card);
  });
}

document.getElementById('search-input')?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = mediaList.filter(item => item.title.toLowerCase().includes(query));
  renderGrid(filtered);
});

renderGrid(mediaList);
