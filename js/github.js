const GITHUB_USERNAME = 'juanoliveira0020'; 
const CACHE_KEY = 'gh-stats-cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora — evita bater o rate limit da API

function getCachedStats() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_DURATION) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function setCachedStats(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    /* localStorage indisponível — segue sem cache */
  }
}

function renderStats({ repos, stars, followers, forks }) {
  document.getElementById('gh-repos').textContent = repos;
  document.getElementById('gh-stars').textContent = stars;
  document.getElementById('gh-followers').textContent = followers;
  document.getElementById('gh-forks').textContent = forks;
}

/* Se a API falhar (rate limit, rede, etc.), mostra um link em vez de "—" mudo */
function renderFallback() {
  document.querySelectorAll('.github-card .value').forEach((el) => { el.textContent = '—'; });
  const note = document.querySelector('.github-note');
  if (note) {
    note.innerHTML = `Não foi possível carregar os dados agora (limite de requisições da API do GitHub). <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" style="color: var(--color-primary-light);">Veja o perfil completo no GitHub →</a>`;
  }
}

async function loadGithubStats() {
  const elRepos = document.getElementById('gh-repos');
  if (!elRepos) return; // seção não está nesta página

  // 1. Usa cache local se ainda for válido — evita nova chamada à API
  const cached = getCachedStats();
  if (cached) {
    renderStats(cached);
    return;
  }

  try {
    // Dados do perfil (seguidores, total de repositórios públicos)
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!userRes.ok) throw new Error(`Perfil: ${userRes.status}`);
    const user = await userRes.json();

    // Soma estrelas e forks de todos os repositórios públicos (até 100)
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
    );
    if (!reposRes.ok) throw new Error(`Repos: ${reposRes.status}`);
    const repos = await reposRes.json();

    const stats = {
      repos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      stars: repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
      forks: repos.reduce((sum, r) => sum + (r.forks_count || 0), 0),
    };

    setCachedStats(stats);
    renderStats(stats);
  } catch (err) {
    console.warn('GitHub stats indisponíveis no momento:', err.message);
    renderFallback();
  }
}

document.addEventListener('DOMContentLoaded', loadGithubStats);