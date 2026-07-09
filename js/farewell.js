export function initFarewell() {
  const $dialog = document.querySelector(".dialog-farewell");

  if (!$dialog) {
    console.error(`Elemento não encontrado: dialog=${$dialog}`);
    return;
  }

  $dialog.showModal();
}
