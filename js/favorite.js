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
  const $dialog = document.querySelector(".dialog-favorite");
  const $fab = document.querySelector(".fab-favorite");

  if (!$dialog || !$fab) {
    console.error(`Elementos não encontrados: dialog=${$dialog}, fab=${$fab}`);
    return;
  }

  const $dialogBody = $dialog.querySelector(".dialog-body");
  $dialogBody.innerHTML = instruction;

  $dialog.addEventListener("click", (e) => {
    if (e.target === $dialog) $dialog.close();
  });

  const $dialogTitle = $dialog.querySelector("#favorite-title");

  if ($dialogTitle) {
    $dialogTitle.textContent = getTitle(isTouch);
  }

  $fab.addEventListener("click", (e) => {
    $dialog.showModal();
  });
}
