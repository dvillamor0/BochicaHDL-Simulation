const T = window.__TAURI__;
if (!T) {
  console.error("TAURI API NOT FOUND");
}

// core
const invoke = T?.core?.invoke;
const getCurrent = () => T?.window?.getCurrentWindow?.();

// plugins
const fs = T?.fs;
const dialog = T?.dialog;

const open = dialog?.open;
const save = dialog?.save;

const readTextFile = fs?.readTextFile;
const writeFile = fs?.writeFile;
const readDir = fs?.readDir;

import * as State from "../core/state.js";

/* ================= UTILS ================= */
function assertAPI(name, fn) {
  if (!fn) {
    console.error(`[TAURI] Missing API: ${name}`);
    return false;
  }
  return true;
}

/* ================= FILE ================= */

export async function newFile() {
  console.log("[CMD] newFile");
  State.openFile("untitled.v", "// TODO: new file template\n");
}

export async function openFile() {
  console.log("[CMD] openFile");

  if (!assertAPI("dialog.open", open)) return;

  const path = await open({
    filters: [{ name: "Verilog", extensions: ["v"] }]
  });

  if (!path) return;

  if (!assertAPI("fs.readTextFile", readTextFile)) return;

  const data = await readTextFile(path);
  // normalize name as basename
  const name = path.split(/[/\\]/).pop();
  State.openFile(name, data);
}

export async function openDir() {
  console.log("[CMD] openDir");

  if (!assertAPI("dialog.open", open)) return;
  if (!assertAPI("fs.readDir", readDir)) return;

  const dir = await open({ directory: true });
  if (!dir) return;

  const tree = await readDir(dir, { recursive: true });

  // sanitize tree for UI (no BigInt / circular refs)
  const safeTree = JSON.parse(JSON.stringify(tree));

  State.emit("workspace:loaded", { dir, tree: safeTree });
}

export async function saveFile() {
  console.log("[CMD] saveFile");

  const f = State.getActiveFile();
  if (!f) return;

  if (!assertAPI("dialog.save", save)) return;
  if (!assertAPI("fs.writeFile", writeFile)) return;

  const path = await save({ defaultPath: f.path });
  if (!path) return;

  await writeFile({ path, contents: f.content });
}

export async function saveFileAs() {
  console.log("[CMD] saveFileAs");

  const f = State.getActiveFile();
  if (!f) return;

  if (!assertAPI("dialog.save", save)) return;
  if (!assertAPI("fs.writeFile", writeFile)) return;

  const path = await save();
  if (!path) return;

  await writeFile({ path, contents: f.content });
}

export function exit() {
  console.log("[CMD] exit");

  const win = getCurrent();
  if (!win) {
    console.warn("[TAURI] getCurrentWindow not available");
    return;
  }

  win.close();
}

/* ================= EDIT ================= */

export function find() {
  console.warn("TODO: implement Find dialog");
}

export function replace() {
  console.warn("TODO: implement Replace dialog");
}

export async function analyzeSV(source) {
  if (!invoke) {
    console.warn("[EDITOR] invoke not available");
    return null;
  }

  try {
    const result = await invoke("sv_analyze", { source });
    console.log("[SV_ANALYZE RESULT]", result);
    return result;
  } catch (err) {
    console.error("[EDITOR] sv_analyze failed:", err);
    return null;
  }
}

/* ================= SIMULATION ================= */

export async function runSim() {
  console.log("[CMD] runSim");

  if (!assertAPI("core.invoke", invoke)) return;

  const f = State.getActiveFile();
  if (!f) return;

  await invoke("run_simulation", { code: f.content });
}

export function pauseSim() {
  console.warn("TODO: implement simulation pause");
  if (invoke) invoke("pause_simulation");
}

export function stopSim() {
  console.log("[CMD] stopSim");
  if (invoke) invoke("stop_simulation");
}

export function stepSim() {
  console.warn("TODO: implement step simulation");
  if (invoke) invoke("step_simulation");
}