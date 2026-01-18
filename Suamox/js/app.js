/* =========================================================
   SUAMOX COMPONENT LOADER
========================================================= */

async function loadComponent(name) {
  const host = document.querySelector(`[data-component="${name}"]`);
  if (!host) return;

  try {
    const res = await fetch(`components/${name}.html`);
    const html = await res.text();
    host.innerHTML = html;
  } catch (err) {
    host.innerHTML = `<pre style="color:red">Failed to load ${name}</pre>`;
    console.error(err);
  }
}

/* Load all panels */
["files", "editor", "canvas", "testbench"].forEach(loadComponent);
