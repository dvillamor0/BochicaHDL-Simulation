const state = {
  activeFile: null,
  files: {},
  workspace: null,
  fileTree: [],
  listeners: {},
};

/* EVENTS */

export function on(event, handler) {
  if (!state.listeners[event]) state.listeners[event] = [];
  state.listeners[event].push(handler);
}

export function emit(event, payload) {
  (state.listeners[event] || []).forEach(fn => fn(payload));
}

/* FILES */

export function openFile(name, content = "") {
  if (!state.files[name]) {
    state.files[name] = content;
    emit("file:opened", { name, content });
  }
  state.activeFile = name;
  emit("file:activated", { name });
}

export function updateContent(content) {
  if (!state.activeFile) return;
  state.files[state.activeFile] = content;
  emit("file:updated", { name: state.activeFile, content });
}

export function getActiveFile() {
  return {
    name: state.activeFile,
    content: state.files[state.activeFile] || "",
  };
}

/* WORKSPACE */

export function setWorkspace(path) {
  state.workspace = path;
  emit("workspace:set", path);
}

export function getWorkspace() {
  return state.workspace;
}

export function setFileTree(tree) {
  state.fileTree = tree;
  emit("tree:updated", tree);
}

export function getFileTree() {
  return state.fileTree;
}

/* INIT */

export function initState() {
  console.log("[STATE] Initialized");
}
