const mediaList = [
  {
    title: "Battle Through The Heavens (Season 5)",
    episode: "Ep 102",
    poster: "https://images.justwatch.com/poster/305886981/s332/battle-through-the-heavens.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    title: "Soul Land 2: The Peerless Tang Sect",
    episode: "Ep 60",
    poster: "https://m.media-amazon.com/images/M/MV5BN2FlyWRhZTUtYWE0NS00Y2EyLTk4NTctNTFmZWRiYjhkYTUyXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    title: "Perfect World (Wanmei Shijie)",
    episode: "Ep 175",
    poster: "https://m.media-amazon.com/images/M/MV5BMDRiNTA0YZktM2NhMy00MDM3LTg0OTAtOTczOWJmMDhjMDkxXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    title: "Swallowed Star (Season 4)",
    episode: "Ep 130",
    poster: "https://m.media-amazon.com/images/M/MV5BZDkyNWIxMGMtNDlhMi00YzMwLWEYNWUtOGNmZWM2ZDIxY2U1XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    title: "Renegade Immortal (Xian Ni)",
    episode: "Ep 48",
    poster: "https://m.media-amazon.com/images/M/MV5BZDU1NzM4ZDItOTM1MC00NmE4LThjYTUtNDcwOTc4NTlkOTlmXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    title: "Against The Gods",
    episode: "Ep 32",
    poster: "https://m.media-amazon.com/images/M/MV5BZTFiMjhhNWEtOTIxNi00YWQ1LThjYmItYTAtNDY3NWM3YjVkXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoytouches.mp4"
  },
  {
    title: "Throne of Seal",
    episode: "Ep 115",
    poster: "https://m.media-amazon.com/images/M/MV5BYzA2NzRhYzAtOTg1ZS00MTgwLWI1ZTAtYY1jZDdiNDM5NDk3XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  },
  {
    title: "Stellar Transformation",
    episode: "Ep 80",
    poster: "https://m.media-amazon.com/images/M/MV5BZTljNzk3NDQtMWEzMi00OGQ1LTllMDgtNGE1YzRmNTI2YjJmXkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  {
    title: "Apotheosis",
    episode: "Ep 75",
    poster: "https://m.media-amazon.com/images/M/MV5BNzdmZTVjyjAtZDhlNi00YWUxLTg5YTItZTBlMzgxZTIzZDk1XkEyXkFqcGc@._V1_.jpg",
    streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnTheLakesideRing.mp4"
  }
];

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition cursor-pointer flex flex-col";
    card.innerHTML = `
      <div class="relative aspect-[3/4] w-full bg-gray-800">
        <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover">
        <span class="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">${item.episode}</span>
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
