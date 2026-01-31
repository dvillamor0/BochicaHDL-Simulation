// Suamox Editor — frontend dumb, backend-driven

import * as State from "../core/state.js";
import { analyzeSV } from "../../tauri/commands.js";

/* -------------------------------------------------
 * Editor module
 * ------------------------------------------------- */

window.SuamoxEditor = (() => {
  let editor = null;
  let highlight = null;
  let lines = null;

  let scrollRAF = null;
  let analyzeRAF = null;

  /* ---------- Scroll sync (UI only) ---------- */

  function syncScroll() {
    if (scrollRAF) return;

    scrollRAF = requestAnimationFrame(() => {
      highlight.scrollTop = editor.scrollTop;
      highlight.scrollLeft = editor.scrollLeft;
      if (lines) lines.scrollTop = editor.scrollTop;
      scrollRAF = null;
    });
  }

  /* ---------- Render ---------- */

  function render() {
    if (!editor || !highlight) return;

    const code = editor.value;
    const semantic = State.getSemantic?.() ?? null;

    highlight.innerHTML =
      SuamoxLexer.lex(code, semantic) + "\n";

    updateLines();
  }

  function updateLines() {
    if (!lines) return;

    const count = editor.value.split("\n").length;
    lines.textContent = Array.from(
      { length: count },
      (_, i) => i + 1
    ).join("\n");
  }

  /* ---------- Input handling ---------- */

  function onInput() {
    const code = editor.value;

    // textual state (fast, local)
    State.updateContent(code);

    // debounce backend semantic analysis
    if (analyzeRAF) cancelAnimationFrame(analyzeRAF);

    analyzeRAF = requestAnimationFrame(async () => {
      const semantic = await analyzeSV(code);

      if (semantic) {
        State.updateSemantic(semantic);
      }

      render();
      analyzeRAF = null;
    });
  }

  /* ---------- Init ---------- */

  function init() {
    editor = document.getElementById("editor");
    highlight = document.getElementById("highlight");
    lines = document.getElementById("lines");

    if (!editor || !highlight) {
      console.warn("[EDITOR] DOM not ready");
      return false;
    }

    editor.addEventListener("scroll", syncScroll);
    editor.addEventListener("input", onInput);
    window.addEventListener("resize", render);

    render();
    console.log("[EDITOR] initialized");
    return true;
  }

  /* ---------- Auto-init ---------- */

  const observer = new MutationObserver(() => {
    if (init()) observer.disconnect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  /* ---------- Public API ---------- */

  function setValue(code) {
    editor.value = code;
    onInput();
  }

  function getValue() {
    return editor.value;
  }

  return {
    init,
    setValue,
    getValue,
    updateLines,
  };
})();
