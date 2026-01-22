// ===== TAURI GLOBAL API =====
const dialog = window.__TAURI__.dialog;
const fs = window.__TAURI__.fs;
const invoke = window.__TAURI__.core.invoke;
const tauriWindow = window.__TAURI__.window;

const readTextFile = fs.readTextFile;
const writeFile = fs.writeFile;
const readDir = fs.readDir;

// Esperar a que topbar exista
function waitTopbar() {
  return new Promise(resolve => {
    const obs = new MutationObserver(() => {
      if (document.getElementById("file-new")) {
        obs.disconnect();
        resolve();
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  });
}

(async () => {
  await waitTopbar();
  console.log("[Topbar] Menu actions ready");

  // ===== NUEVO ARCHIVO =====
  document.getElementById("file-new").onclick = () => {
    console.log("Nuevo archivo");
    State.openFile("untitled.v", "// new file\n");
  };

  // ===== ABRIR ARCHIVO =====
  document.getElementById("file-open-file").onclick = async () => {
    console.log("Abrir archivo");

    const path = await open({
      filters: [{ name: "Verilog", extensions: ["v"] }],
    });
    if (!path) return;

    const data = await readTextFile(path);
    const name = path.split(/[/\\]/).pop(); // cross-platform
    State.openFile(name, data);
  };

  // ===== ABRIR DIRECTORIO (WORKSPACE) =====
  document.getElementById("file-open-dir").onclick = async () => {
    console.log("Abrir workspace");

    const dir = await open({ directory: true, multiple: false });
    if (!dir) return;

    console.log("Workspace:", dir);

    const tree = await readDir(dir, { recursive: true });
    State.emit("workspace:loaded", { dir, tree });
  };

  // ===== GUARDAR =====
  document.getElementById("file-save").onclick = async () => {
    console.log("Guardar archivo");

    const file = State.getActiveFile();
    if (!file.name) return alert("No file active");

    const path = await save({ defaultPath: file.name });
    if (!path) return;

    await writeFile({ path, contents: file.content });
  };

  // ===== GUARDAR COMO =====
  document.getElementById("file-save-as").onclick = async () => {
    console.log("Guardar como");

    const path = await save();
    if (!path) return;

    await writeFile({ path, contents: State.getActiveFile().content });
  };

  // ===== SALIR =====
  document.getElementById("file-exit").onclick = async () => {
    console.log("Salir");
    tauriWindow.getCurrent().close();
  };

  // ===== SIMULATION RUN =====
  document.getElementById("sim-run").onclick = async () => {
    console.log("Run simulation");
    await invoke("run_simulation", {
      code: State.getActiveFile().content
    });
  };

  document.getElementById("sim-stop").onclick = () => {
    console.log("Stop simulation");
    invoke("stop_simulation");
  };
})();
