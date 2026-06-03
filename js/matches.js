export function normalizeMatches(matches) {
  return matches.map((m) => ({ ...m, played: m.played ?? null }));
}

export function getAllMatchesSorted(worldCup, others) {
  return [...worldCup, ...others].sort((a, b) => {
    const da = new Date(`${a.date}T${a.schedule}:00`);
    const db = new Date(`${b.date}T${b.schedule}:00`);
    return da - db;
  });
}

export function getNextMatch(allMatches, now) {
  return (
    allMatches.find((m) => new Date(`${m.date}T${m.schedule}:00`) > now) ?? null
  );
}

export function getLastPlayedMatch(allMatches, now) {
  const past = allMatches.filter(
    (m) => new Date(`${m.date}T${m.schedule}:00`) <= now && m.played !== null,
  );
  return past.length > 0 ? past[past.length - 1] : null;
}

export function formatCountdown(targetDate, now) {
  const diff = targetDate - now;
  if (diff <= 0) return "Jogo em andamento";

  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);

  const pad = (n) => String(n).padStart(2, "0");
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  parts.push(`${pad(hours)}h`);
  parts.push(`${pad(minutes)}m`);

  return parts.join(" ");
}
