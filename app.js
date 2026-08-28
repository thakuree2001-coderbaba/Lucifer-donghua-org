const mediaList = [
  {
    title: "Battle Through The Heavens (Season 5)",
    poster: "https://picsum.photos/id/10/300/400",
    episodes: [
      {
        ep: "Episode 1",
        players: {
          Server1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          Server2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          Server3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        },
        downloadUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      },
      {
        ep: "Episode 2",
        players: {
          Server1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          Server2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          Server3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
        },
        downloadUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
      }
    ]
  },
  {
    title: "Soul Land 2: The Peerless Tang Sect",
    poster: "https://picsum.photos/id/11/300/400",
    episodes: [
      {
        ep: "Episode 1",
        players: {
          Server1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          Server2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          Server3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
        },
        downloadUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      }
    ]
  }
];

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  if(!grid) return;
  grid.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = "bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition cursor-pointer flex flex-col";
    card.innerHTML = `
      <div class="relative aspect-[3/4] w-full bg-gray-800">
        <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover">
        <span class="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">${item.episodes.length} Eps</span>
      </div>
      <div class="p-3 flex-grow flex items-center">
        <h3 class="font-medium text-xs sm:text-sm text-gray-200 line-clamp-2 leading-tight">${item.title}</h3>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `watch.html?id=${index}`;
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
