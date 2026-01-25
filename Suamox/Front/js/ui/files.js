window.Workspace = (() => {

  const T = window.__TAURI__;
  const dialog = T.dialog;
  const fs = T.fs;

  async function openWorkspace() {
    const folder = await dialog.open({ directory: true });
    if (!folder) return;

    State.setWorkspace(folder);

    const tree = await fs.readDir(folder, { recursive: true });
    State.setFileTree(tree);
  }

  State.on("tree:updated", tree => {
    const el = document.querySelector(".filetree");
    if (!el) return;
    el.innerHTML = renderTree(tree);
  });

  function renderTree(nodes) {
    return `<ul>${nodes.map(renderNode).join("")}</ul>`;
  }

  function renderNode(n) {
    if (n.children) {
      return `
        <li class="folder">${n.name}
          ${renderTree(n.children)}
        </li>`;
    }
    return `<li class="file" data-path="${n.path}">${n.name}</li>`;
  }

  document.addEventListener("click", async e => {
    const file = e.target.closest(".file");
    if (!file) return;

    const path = file.dataset.path;
    const content = await fs.readTextFile(path);

    State.openFile(path, content);
  });

  State.on("file:opened", ({ content }) => {
    SuamoxEditor.setValue(content);
  });

  return { openWorkspace };
})();
