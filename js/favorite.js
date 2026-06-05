export function getTitle(isTouch) {
  if (isTouch) {
    return "Adicionar à Tela de Início";
  }
  return "Salvar nos Favoritos";
}
export function getModalInstruction(isTouch) {
  if (isTouch) {
    return 'Toque em <strong>Compartilhar</strong> (⬆) e depois em <strong>"Adicionar à Tela de Início"</strong> para salvar esta página.';
  }
  return "Pressione <kbd>Ctrl+D</kbd> (ou <kbd>Cmd+D</kbd> no Mac) para salvar esta página nos favoritos do navegador.";
}

export function initFavorite() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const instruction = getModalInstruction(isTouch);

  const dialog = document.querySelector(".dialog-favorite");
  const dialogBody = document.querySelector(".dialog-body");
  dialogBody.innerHTML = instruction;

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  const fab = document.querySelector(".fab-favorite");
  const fabTitle = document.querySelector("#favorite-title");

  if (fabTitle) {
    const title = getTitle(isTouch);
    fabTitle.textContent = title;
  }

  fab.addEventListener("click", (e) => {
    dialog.showModal();
    dialog.querySelector(".dialog-close").focus();
  });
}
