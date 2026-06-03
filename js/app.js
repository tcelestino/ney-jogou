import {
  normalizeMatches,
  getAllMatchesSorted,
  getNextMatch,
  getLastPlayedMatch,
} from "./matches.js";

const FLAGS = {
  Brasil: "🇧🇷",
  Marrocos: "🇲🇦",
  Haiti: "🇭🇹",
  Escócia: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  Egito: "🇪🇬",
};

function withFlag(name) {
  const flag = FLAGS[name];
  return flag ? `${flag} ${name}` : name;
}

async function init() {
  let worldCup, others;
  try {
    const [wcRes, othersRes] = await Promise.all([
      fetch("./data/world-cup.json"),
      fetch("./data/others.json"),
    ]);
    if (!wcRes.ok) throw new Error(`HTTP ${wcRes.status}`);
    if (!othersRes.ok) throw new Error(`HTTP ${othersRes.status}`);
    worldCup = normalizeMatches(await wcRes.json());
    others = normalizeMatches(await othersRes.json());
  } catch (err) {
    console.error("Erro ao carregar jogos:", err);
    document.getElementById("loading").style.display = "none";
    return;
  }

  const allMatches = getAllMatchesSorted(worldCup, others);
  const now = new Date();
  const nextMatch = getNextMatch(allMatches, now);
  const lastPlayedMatch = getLastPlayedMatch(allMatches, now);

  renderNextGame(nextMatch);
  renderLastGame(lastPlayedMatch);
  renderGameList("tournament-list", worldCup, nextMatch);
  renderGameList("others-list", others, nextMatch);

  document.getElementById("loading").style.display = "none";
  document.getElementById("games-section").hidden = false;

  if (nextMatch) {
    startCountdown(nextMatch);
  }
}

function renderNextGame(match) {
  const section = document.getElementById("next-game");
  if (!match) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  document.getElementById("next-teams").textContent =
    `${withFlag(match.home)} × ${withFlag(match.away)}`;
  document.getElementById("next-details").textContent =
    `${formatDate(match.date)} · ${match.schedule}${match.stage ? " · " + match.stage : ""}`;
}

function renderLastGame(match) {
  const section = document.getElementById("last-game");
  if (!match) {
    section.hidden = true;
    return;
  }
  section.hidden = false;

  document.getElementById("last-teams").textContent =
    `${withFlag(match.home)} × ${withFlag(match.away)}`;
  document.getElementById("last-details").textContent =
    `${formatDate(match.date)}${match.stage ? " · " + match.stage : ""}`;

  const badge = document.getElementById("last-played-badge");
  badge.className = "played-badge " + (match.played ? "yes" : "no");
  badge.querySelector(".big").textContent = match.played ? "SIM" : "NÃO";
  badge.querySelector(".sub").textContent = match.played
    ? "jogou ✓"
    : "não jogou";
}

function renderGameList(containerId, matches, nextMatch) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  matches.forEach((match) => {
    const isNext =
      nextMatch &&
      match.date === nextMatch.date &&
      match.schedule === nextMatch.schedule &&
      match.home === nextMatch.home;

    let statusClass, statusText;
    if (match.played === true) {
      statusClass = "status-yes";
      statusText = "JOGOU";
    } else if (match.played === false) {
      statusClass = "status-no";
      statusText = "NÃO JOGOU";
    } else if (isNext) {
      statusClass = "status-pending";
      statusText = "EM BREVE";
    } else {
      statusClass = "status-future";
      statusText = "—";
    }

    const item = document.createElement("div");
    item.className = "game-item";
    item.setAttribute(
      "aria-label",
      `${match.home} versus ${match.away}, ${formatDate(match.date)}`,
    );
    item.innerHTML = `
      <div>
        <div class="date">${formatDate(match.date)}${match.stage ? " · " + match.stage : ""}</div>
        <div class="teams">${withFlag(match.home)} × ${withFlag(match.away)}</div>
      </div>
      <span class="${statusClass}" aria-live="polite">${statusText}</span>
    `;
    container.appendChild(item);
  });
}

function startCountdown(match) {
  const target = new Date(`${match.date}T${match.schedule}:00`);
  const el = document.getElementById("countdown-value");

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.textContent = "Jogo em andamento";
      return;
    }

    const total = Math.floor(diff / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const pad = (n) => String(n).padStart(2, "0");
    const parts = [];

    if (days > 0) parts.push(`${days}d`);
    parts.push(`${pad(hours)}h`);
    parts.push(`${pad(minutes)}m`);

    el.textContent = parts.join(" ");
    setTimeout(tick, 1000);
  }

  tick();
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

document.addEventListener("DOMContentLoaded", init);
