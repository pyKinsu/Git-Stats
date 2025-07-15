// === Sidebar Toggle ===
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtn.textContent = sidebar.classList.contains("open") ? "✖" : "☰";
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && e.target !== menuBtn) {
    sidebar.classList.remove("open");
    menuBtn.textContent = "☰";
  }
});

// === Theme Toggle ===
const toggleBtn = document.querySelector(".toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// === Language Switcher ===
const langSelect = document.getElementById("lang-select");
langSelect.addEventListener("change", () => {
  alert(`Language switched to ${langSelect.value}`);
});

// === Search Button & GitHub Fetch ===
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const cardsContainer = document.querySelector(".cards");
const chartContainer = document.querySelector("#chart");

searchBtn.addEventListener("click", async () => {
  const username = searchInput.value.trim();
  if (!username) return alert("Please enter a username");

  const profileUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(profileUrl),
      fetch(reposUrl),
    ]);

    if (!profileRes.ok || !reposRes.ok) throw new Error("User not found");

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    renderProfileCard(profile);
    renderRepoCards(repos);
    renderCharts(repos);
  } catch (err) {
    alert("GitHub user not found!");
  }
});

function renderProfileCard(profile) {
  cardsContainer.innerHTML = `
    <div class="card">
      <h3>@${profile.login}</h3>
      <img src="${profile.avatar_url}" alt="Avatar" width="80" style="border-radius:50%;margin-bottom:10px;">
      <p><strong>Name:</strong> ${profile.name || "N/A"}</p>
      <p><strong>Followers:</strong> ${profile.followers}</p>
      <p><strong>Following:</strong> ${profile.following}</p>
      <p><strong>Public Repos:</strong> ${profile.public_repos}</p>
      <p><strong>Bio:</strong> ${profile.bio || "No bio"}</p>
    </div>
  `;
}

function renderRepoCards(repos) {
  const topStarred = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
  const topForked = [...repos].sort((a, b) => b.forks_count - a.forks_count)[0];

  cardsContainer.innerHTML += `
    <div class="card">
      <h3>Top Starred Repo</h3>
      <p>${topStarred.name}</p>
      <p>⭐ ${topStarred.stargazers_count}</p>
      <p>Forks: ${topStarred.forks_count}</p>
    </div>
    <div class="card">
      <h3>Top Forked Repo</h3>
      <p>${topForked.name}</p>
      <p>⭐ ${topForked.stargazers_count}</p>
      <p>Forks: ${topForked.forks_count}</p>
    </div>
  `;
}

function renderCharts(repos) {
  const languages = {};
  const stars = [];
  const forks = [];

  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
    stars.push(repo.stargazers_count);
    forks.push(repo.forks_count);
  });

  chartContainer.innerHTML = `<canvas id="langChart" height="150"></canvas>
    <canvas id="starForkChart" height="150" style="margin-top:30px;"></canvas>`;

  const ctxLang = document.getElementById("langChart").getContext("2d");
  new Chart(ctxLang, {
    type: "bar",
    data: {
      labels: Object.keys(languages),
      datasets: [{
        label: "Languages Used",
        data: Object.values(languages),
        backgroundColor: "#00ff80",
      }]
    }
  });

  const ctxStats = document.getElementById("starForkChart").getContext("2d");
  new Chart(ctxStats, {
    type: "line",
    data: {
      labels: repos.map(r => r.name).slice(0, 10),
      datasets: [
        {
          label: "Stars",
          data: stars.slice(0, 10),
          borderColor: "#00f",
          fill: false,
        },
        {
          label: "Forks",
          data: forks.slice(0, 10),
          borderColor: "#f00",
          fill: false,
        },
      ]
    }
  });
}
