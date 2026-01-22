async function loadComponent(name) {
  const el = document.querySelector(`[data-component="${name}"]`);
  const res = await fetch(`components/${name}.html`);
  el.innerHTML = await res.text();
}

async function boot() {
  await loadComponent("topbar");
  await loadComponent("files");
  await loadComponent("editor");
  await loadComponent("canvas");
  await loadComponent("testbench");

  initTopbar();        // 👈 AQUÍ
  SuamoxEditor.init(); // si aplica
}

boot();