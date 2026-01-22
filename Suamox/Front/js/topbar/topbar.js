// Topbar UI behavior (NO modules)

function initTopbar() {
  const items = document.querySelectorAll(".menu-item");
  const menus = document.querySelectorAll(".menu-dropdown");

  console.log("[Topbar] init, items:", items.length);

  function closeAll() {
    menus.forEach(m => m.style.display = "none");
  }

  items.forEach(item => {
    item.addEventListener("click", e => {
      e.stopPropagation();
      closeAll();

      const id = "menu-" + item.dataset.menu;
      const menu = document.getElementById(id);
      if (!menu) return;

      const rect = item.getBoundingClientRect();
      menu.style.left = rect.left + "px";
      menu.style.top = rect.bottom + "px";
      menu.style.display = "flex";

      console.log("[Topbar] OPEN MENU:", id);
    });
  });

  // click fuera = cerrar
  document.addEventListener("click", e => {
    if (!e.target.closest(".menu-bar") && !e.target.closest(".menu-dropdown")) {
      closeAll();
    }
  });

  // ESC = cerrar menus
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAll();
  });
}

// Auto-init cuando HTML exista
(function waitTopbarDOM() {
  const obs = new MutationObserver(() => {
    if (document.querySelector(".topbar")) {
      obs.disconnect();
      initTopbar();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
})();
