const State = (() => {
  const state = {
    activeFile: null,
    files: {},

    workspace: null,
    fileTree: [],

    listeners: {},
  };

  /* ================= EVENTS ================= */

  function on(event, handler) {
    if (!state.listeners[event]) state.listeners[event] = [];
    state.listeners[event].push(handler);
  }

  function emit(event, payload) {
    (state.listeners[event] || []).forEach(fn => fn(payload));
  }

  /* ================= FILES ================= */

  function openFile(name, content = "") {
    if (!state.files[name]) {
      state.files[name] = content;
      emit("file:opened", { name, content });
    }
    state.activeFile = name;
    emit("file:activated", { name });
  }

  function updateContent(content) {
    if (!state.activeFile) return;
    state.files[state.activeFile] = content;
    emit("file:updated", {
      name: state.activeFile,
      content,
    });
  }

  function getActiveFile() {
    return {
      name: state.activeFile,
      content: state.files[state.activeFile] || "",
    };
  }

  /* ================= WORKSPACE ================= */

  function setWorkspace(path) {
    state.workspace = path;
    emit("workspace:set", path);
  }

  function getWorkspace() {
    return state.workspace;
  }

  function setFileTree(tree) {
    state.fileTree = tree;
    emit("tree:updated", tree);
  }

  function getFileTree() {
    return state.fileTree;
  }

  return {
    on,
    emit,

    openFile,
    updateContent,
    getActiveFile,

    setWorkspace,
    getWorkspace,
    setFileTree,
    getFileTree,
  };
})();
