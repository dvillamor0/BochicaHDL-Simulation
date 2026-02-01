
const state = {
  files: {},          
  activeFile: null,   
  workspace: null,
  fileTree: [],
  listeners: {},
};

export function on(event, fn) {
  if (!state.listeners[event]) state.listeners[event] = [];
  state.listeners[event].push(fn);
}

export function emit(event, payload) {
  (state.listeners[event] || []).forEach(fn => {
    try { fn(payload); } catch (e) { console.error("[STATE] listener error", e); }
  });
}

/* FILES API */

export function openFile(path, content = "") {
  if (!state.files[path]) {
    state.files[path] = { content };
    emit("file:opened", { path, content });
  }
  state.activeFile = path;
  emit("file:activated", { path, content: state.files[path].content });
}

export function setActiveFile(path) {
  if (!state.files[path]) return false;
  state.activeFile = path;
  emit("file:activated", { path, content: state.files[path].content });
  return true;
}

export function updateContent(content) {
  if (!state.activeFile) return;
  state.files[state.activeFile].content = content;
  emit("file:updated", { path: state.activeFile, content });
}

export function getActiveFile() {
  if (!state.activeFile) return null;
  return { path: state.activeFile, content: state.files[state.activeFile].content };
}

/* WORKSPACE */

export function setWorkspace(path) {
  state.workspace = path;
  emit("workspace:set", path);
}

export function getWorkspace() { return state.workspace; }

export function setFileTree(tree) {
  state.fileTree = tree;
  emit("tree:updated", tree);
}

export function getFileTree() { return state.fileTree; }

/* INIT */
export function initState() {
  console.log("[STATE] initialized (passive)");
}

export default state;
