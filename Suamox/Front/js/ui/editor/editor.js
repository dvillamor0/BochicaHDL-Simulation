window.SuamoxEditor = (() => {
  let editor, highlight, lines;
  let scrollRAF = null;

  function syncScroll() {
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(() => {
      highlight.scrollTop = editor.scrollTop;
      highlight.scrollLeft = editor.scrollLeft;
      if (lines) lines.scrollTop = editor.scrollTop;
      scrollRAF = null;
    });
  }

  function render() {
    if (!editor || !highlight) return;
    const safe = editor.value;
    highlight.innerHTML = SuamoxLexer.lex(safe) + "\n";
    updateLines();
  }

  function updateLines() {
    if (!lines) return;
    const n = editor.value.split("\n").length;
    lines.textContent = Array.from({ length: n }, (_, i) => i + 1).join("\n");
  }

  function init() {
    editor = document.getElementById("editor");
    highlight = document.getElementById("highlight");
    lines = document.getElementById("lines");

    if (!editor || !highlight) {
      console.warn("SuamoxEditor: DOM not ready yet");
      return false;
    }

    editor.addEventListener("scroll", syncScroll);
    editor.addEventListener("input", () => {
      render();
      State.updateContent(editor.value);
    });

    window.addEventListener("resize", render);
    render();
    console.log("SuamoxEditor initialized");
    return true;
  }

  // 🔥 AUTO INIT (parallel safe)
  const observer = new MutationObserver(() => {
    if (init()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function setValue(code) {
    editor.value = code;
    render();
  }

  function getValue() {
    return editor.value;
  }

  return { init, setValue, getValue, updateLines };
})();
