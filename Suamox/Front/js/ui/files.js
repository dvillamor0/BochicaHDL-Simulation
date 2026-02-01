import * as State from "../core/state.js";

window.Workspace = (() => {
  const T = window.__TAURI__;
  const dialog = T?.dialog;
  const fs = T?.fs;

  async function openWorkspace() {
    const folder = await dialog.open({ directory: true });
    if (!folder) return;

    State.setWorkspace(folder);

    const tree = await fs.readDir(folder, { recursive: true });
    const safeTree = JSON.parse(JSON.stringify(tree));
    State.setFileTree(safeTree);
  }

  State.on("tree:updated", tree => {
    const el = document.querySelector(".file-tree");
    if (!el) return;
    el.innerHTML = renderTree(tree);
  });

  function renderTree(nodes) {
    return `<ul>${nodes.map(renderNode).join("")}</ul>`;
  }

  function renderNode(n) {
    if (n.children) {
      return `<li class="folder">${n.name}${renderTree(n.children)}</li>`;
    }
    // for files we store the full path in data-path to let State.openFile use basename when reading
    return `<li class="file" data-path="${n.path}">${n.name}</li>`;
  }

  document.addEventListener("click", async e => {
    const file = e.target.closest(".file");
    if (!file) return;

    const path = file.dataset.path;
    const content = await fs.readTextFile(path);
    // openFile expects a normalized name (we keep basename to maintain tab naming consistent)
    const name = path.split(/[/\\]/).pop();
    State.openFile(name, content);
  });

  return { openWorkspace };
})();