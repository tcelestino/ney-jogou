import { describe, it, expect } from "vitest";
import { getTitle, getModalInstruction } from "../../js/favorite.js";

describe("Favoritos", () => {
  describe("Título de favoritos", () => {
    it("retorna título mobile quando isTouch é true", () => {
      const result = getTitle(true);
      expect(result).toContain("Adicionar");
    });

    it("retorna título desktop quando isTouch é false", () => {
      const result = getTitle(false);
      expect(result).toContain("Salvar");
    });
  });
  describe("Instruções de favoritos", () => {
    it("retorna instrução mobile quando isTouch é true", () => {
      const result = getModalInstruction(true);
      expect(result).toContain("Compartilhar");
      expect(result).toContain("Adicionar");
    });

    it("retorna instrução desktop quando isTouch é false", () => {
      const result = getModalInstruction(false);
      expect(result).toContain("Ctrl+D");
      expect(result).toContain("Cmd+D");
    });
  });
});
