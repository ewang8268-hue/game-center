const games = [
  {
    title: "Little Alchemy 2",
    category: "logic",
    pace: "Puzzle",
    image: "assets/little-alchemy-2.svg",
    url: "https://littlealchemy2.com/",
    description: "Mix elements into discoveries with a clean, low-pressure puzzle loop."
  },
  {
    title: "Polytrack",
    category: "racing",
    pace: "Time trial",
    image: "assets/polytrack.svg",
    url: "https://www.kodub.com/apps/polytrack",
    description: "A crisp racing challenge built around speed, timing, and clean corners."
  },
  {
    title: "Drift Hunters",
    category: "driving",
    pace: "Garage",
    image: "assets/drift-hunters.svg",
    url: "https://www.drift-hunters.com/",
    description: "Tune cars, build angle, and chase longer drifts on wide tracks."
  },
  {
    title: "2048",
    category: "logic",
    pace: "Puzzle",
    image: "assets/2048.svg",
    url: "https://play2048.co/",
    description: "Slide number tiles, merge matches, and chase the 2048 tile."
  },
  {
    title: "Cookie Clicker",
    category: "arcade",
    pace: "Idle",
    image: "assets/cookie-clicker.svg",
    url: "https://orteil.dashnet.org/cookieclicker/",
    description: "Click, upgrade, and build a ridiculous cookie empire over time."
  },
  {
    title: "HexGL",
    category: "racing",
    pace: "Speedrun",
    image: "assets/hexgl.svg",
    url: "https://hexgl.bkcore.com/play/",
    description: "A futuristic racing rush with sharp turns and high-speed tracks."
  },
  {
    title: "Slope",
    category: "skill",
    pace: "Reflex",
    image: "assets/slope.svg",
    url: "https://slopegame.io/slope-unblocked",
    description: "Guide a rolling ball through fast drops, ramps, and quick turns."
  },
  {
    title: "Vex 5",
    category: "platform",
    pace: "Parkour",
    image: "assets/vex-5.svg",
    url: "https://www.gamepix.com/play/vex-5",
    description: "Run, jump, slide, and dodge traps through clean platforming stages."
  },
  {
    title: "Moto X3M",
    category: "driving",
    pace: "Stunts",
    image: "assets/moto-x3m.svg",
    url: "https://www.crazygames.com/game/moto-x3m",
    description: "Flip bikes across obstacle tracks and race for cleaner times."
  }
];

const gameGrid = document.querySelector("#games");
const queueList = document.querySelector("#queue-list");
const searchInput = document.querySelector("#game-search");
const filterButtons = document.querySelectorAll("[data-filter]");

let activeFilter = "all";

function createGameCard(game) {
  const card = document.createElement("article");
  card.className = "game-card";
  card.dataset.category = game.category;
  card.dataset.title = game.title.toLowerCase();

  card.innerHTML = `
    <img src="${game.image}" alt="${game.title} thumbnail">
    <div class="game-body">
      <div class="meta-row">
        <span class="tag ${game.category}">${game.category}</span>
        <span>${game.pace}</span>
      </div>
      <div>
        <h2>${game.title}</h2>
        <p>${game.description}</p>
      </div>
      <div class="card-actions">
        <a class="button primary" href="${game.url}">Play</a>
      </div>
    </div>
  `;

  return card;
}

function renderGames() {
  gameGrid.innerHTML = "";
  games.forEach((game) => gameGrid.append(createGameCard(game)));
}

function renderQueue() {
  queueList.innerHTML = "";

  games.forEach((game, index) => {
    const item = document.createElement("a");
    item.className = "queue-item";
    item.href = game.url;
    item.innerHTML = `
      <span class="queue-number">${index + 1}</span>
      <span>
        <strong>${game.title}</strong>
        <span>${game.pace} / ${game.category}</span>
      </span>
    `;
    queueList.append(item);
  });
}

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  document.querySelectorAll(".game-card").forEach((card) => {
    const matchesSearch = card.dataset.title.includes(searchTerm);
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    card.classList.toggle("is-hidden", !matchesSearch || !matchesFilter);
  });
}

renderGames();
renderQueue();

searchInput.addEventListener("input", applyFilters);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    applyFilters();
  });
});
