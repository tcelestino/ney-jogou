import { describe, it, expect } from "vitest";
import {
  normalizeMatches,
  getAllMatchesSorted,
  getNextMatch,
  getLastPlayedMatch,
  formatCountdown,
} from "../../js/matches.js";

describe("normalizeMatches", () => {
  it("normaliza played undefined para null", () => {
    const result = normalizeMatches([
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "Brasil",
        away: "Marrocos",
      },
    ]);
    expect(result[0].played).toBe(null);
  });

  it("preserva played: true", () => {
    const result = normalizeMatches([
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "Brasil",
        away: "Marrocos",
        played: true,
      },
    ]);
    expect(result[0].played).toBe(true);
  });

  it("preserva played: false", () => {
    const result = normalizeMatches([
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "Brasil",
        away: "Marrocos",
        played: false,
      },
    ]);
    expect(result[0].played).toBe(false);
  });
});

describe("getAllMatchesSorted", () => {
  it("ordena os jogos por data crescente", () => {
    const wc = [
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "Brasil",
        away: "Marrocos",
        played: null,
      },
    ];
    const others = [
      {
        date: "2026-06-06",
        schedule: "19:00",
        home: "Brasil",
        away: "Egito",
        played: null,
      },
    ];
    const result = getAllMatchesSorted(wc, others);
    expect(result[0].date).toBe("2026-06-06");
    expect(result[1].date).toBe("2026-06-13");
  });

  it("ordena por horário quando a data é igual", () => {
    const wc = [
      {
        date: "2026-06-13",
        schedule: "21:00",
        home: "A",
        away: "B",
        played: null,
      },
    ];
    const others = [
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "C",
        away: "D",
        played: null,
      },
    ];
    const result = getAllMatchesSorted(wc, others);
    expect(result[0].schedule).toBe("19:00");
  });
});

describe("getNextMatch", () => {
  it("retorna o próximo jogo futuro", () => {
    const now = new Date("2026-06-04T00:00:00");
    const matches = [
      {
        date: "2026-06-06",
        schedule: "19:00",
        home: "Brasil",
        away: "Egito",
        played: null,
      },
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "Brasil",
        away: "Marrocos",
        played: null,
      },
    ];
    expect(getNextMatch(matches, now).date).toBe("2026-06-06");
  });

  it("retorna null quando não há jogos futuros", () => {
    const now = new Date("2099-12-31T23:59:59");
    const matches = [
      {
        date: "2026-06-06",
        schedule: "19:00",
        home: "Brasil",
        away: "Egito",
        played: true,
      },
    ];
    expect(getNextMatch(matches, now)).toBe(null);
  });
});

describe("getLastPlayedMatch", () => {
  it("retorna o jogo passado mais recente com played definido", () => {
    const now = new Date("2026-06-14T00:00:00");
    const matches = [
      {
        date: "2026-06-06",
        schedule: "19:00",
        home: "Brasil",
        away: "Egito",
        played: true,
      },
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "Brasil",
        away: "Marrocos",
        played: true,
      },
      {
        date: "2026-06-19",
        schedule: "21:30",
        home: "Brasil",
        away: "Haiti",
        played: null,
      },
    ];
    expect(getLastPlayedMatch(matches, now).date).toBe("2026-06-13");
  });

  it("retorna null quando nenhum jogo passado tem played definido", () => {
    const now = new Date("2026-06-04T00:00:00");
    const matches = [
      {
        date: "2026-06-06",
        schedule: "19:00",
        home: "Brasil",
        away: "Egito",
        played: null,
      },
    ];
    expect(getLastPlayedMatch(matches, now)).toBe(null);
  });

  it("ignora jogos passados com played: null", () => {
    const now = new Date("2026-06-14T00:00:00");
    const matches = [
      {
        date: "2026-06-06",
        schedule: "19:00",
        home: "Brasil",
        away: "Egito",
        played: null,
      },
      {
        date: "2026-06-13",
        schedule: "19:00",
        home: "Brasil",
        away: "Marrocos",
        played: null,
      },
    ];
    expect(getLastPlayedMatch(matches, now)).toBe(null);
  });
});

describe("formatCountdown", () => {
  it("formata dias, horas, minutos e segundos", () => {
    const target = new Date("2026-06-13T19:00:00");
    const now = new Date("2026-06-06T19:00:00");
    expect(formatCountdown(target, now)).toBe("7d 00h 00m");
  });

  it("formata sem dias quando menos de 24 horas", () => {
    const target = new Date("2026-06-06T19:00:00");
    const now = new Date("2026-06-06T07:30:00");
    expect(formatCountdown(target, now)).toBe("11h 30m");
  });

  it('retorna "Jogo em andamento" quando o alvo está no passado', () => {
    const target = new Date("2026-06-06T19:00:00");
    const now = new Date("2026-06-06T19:00:01");
    expect(formatCountdown(target, now)).toBe("Jogo em andamento");
  });
});
