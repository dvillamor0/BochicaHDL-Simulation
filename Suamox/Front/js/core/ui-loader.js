export async function loadComponent(name) {
  const el = document.querySelector(`[data-component="${name}"]`);
  if (!el) return;
  const res = await fetch(`components/${name}.html`);
  el.innerHTML = await res.text();
}

export async function loadUI() {
  await Promise.all([
    loadComponent("files"),
    loadComponent("editor"),
    loadComponent("canvas"),
    loadComponent("testbench"),
  ]);
}
