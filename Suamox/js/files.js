import { open } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";

const tree = document.getElementById("file-tree");
const openBtn = document.getElementById("open-root");

openBtn.onclick = async () => {
  const dir = await open({
    directory: true,
    multiple: false,
  });

  if (!dir) return;

  tree.innerHTML = "";
  await loadDir(dir, tree);
};

async function loadDir(path, container) {
  const entries = await readDir(path);

  for (const entry of entries) {
    const el = document.createElement("div");
    el.className = "file";
    el.textContent = entry.name;

    container.appendChild(el);

    if (entry.isDirectory) {
      const sub = document.createElement("div");
      sub.style.display = "none";
      container.appendChild(sub);

      el.onclick = async () => {
        sub.style.display = sub.style.display === "none" ? "block" : "none";
        if (!sub.hasChildNodes()) {
          await loadDir(entry.path, sub);
        }
      };
    } else if (entry.name.endsWith(".v")) {
      el.onclick = () => {
        window.dispatchEvent(
          new CustomEvent("open-file", {
            detail: entry.path,
          })
        );
      };
    }
  }
}
