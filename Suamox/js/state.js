/* =========================================================
   SUAMOX GLOBAL STATE (EVENT BUS)
========================================================= */

const State = (() => {
  const state = {
    activeFile: null,
    files: {}, // filename -> content
    listeners: {},
  };

  /* Subscribe to event */
  function on(event, handler) {
    if (!state.listeners[event]) {
      state.listeners[event] = [];
    }
    state.listeners[event].push(handler);
  }

  /* Emit event */
  function emit(event, payload) {
    (state.listeners[event] || []).forEach((fn) => fn(payload));
  }

  /* Open or activate a file */
  function openFile(name, content = "") {
    if (!state.files[name]) {
      state.files[name] = content;
      emit("file:opened", { name, content });
    }
    state.activeFile = name;
    emit("file:activated", { name });
  }

  /* Update current file content */
  function updateContent(content) {
    if (!state.activeFile) return;
    state.files[state.activeFile] = content;
    emit("file:updated", {
      name: state.activeFile,
      content,
    });
  }

  /* Get active file */
  function getActiveFile() {
    return {
      name: state.activeFile,
      content: state.files[state.activeFile] || "",
    };
  }

  return {
    on,
    emit,
    openFile,
    updateContent,
    getActiveFile,
  };
})();
