import { highlight } from "./lexer.js";

export function createEditorView() {
  const editor = document.getElementById("editor");
  const highlightEl = document.getElementById("highlight");
  const linesEl = document.getElementById("lines");
  const tabsEl = document.querySelector(".editor-tabs");

  if (!editor || !highlightEl || !linesEl || !tabsEl) {
    console.warn("[EditorView] DOM not ready");
  }

  // copy vital computed styles so layers align
  function syncStyles() {
    if (!editor || !highlightEl || !linesEl) return;
    const cs = window.getComputedStyle(editor);

    // properties that must match
    const props = [
      "font-family", "font-size", "line-height",
      "padding-top", "padding-right", "padding-bottom", "padding-left",
      "box-sizing", "tab-size", "white-space"
    ];
    for (const p of props) {
      highlightEl.style.setProperty(p, cs.getPropertyValue(p));
      linesEl.style.setProperty(p, cs.getPropertyValue(p));
    }

    // ensure code-layer uses same width/font metrics
    highlightEl.style.position = "absolute";
    highlightEl.style.left = editor.offsetLeft + "px";
  }

  function renderContent(code, semantic) {
    if (!editor) return;
    // set editor content first
    editor.value = code;
    // render highlight WITHOUT adding extra newlines
    highlightEl.innerHTML = highlight(code, semantic);
    renderLines(code);
    syncScroll();
    syncStyles();
  }

  function renderLines(code) {
    if (!linesEl) return;
    const count = code.split(/\r\n|\r|\n/).length;
    let out = "";
    for (let i = 1; i <= count; i++) out += i + "\n";
    linesEl.textContent = out;
  }

  function syncScroll() {
    if (!editor) return;
    highlightEl.scrollTop = editor.scrollTop;
    highlightEl.scrollLeft = editor.scrollLeft;
    linesEl.scrollTop = editor.scrollTop;
  }

  editor.addEventListener("scroll", () => requestAnimationFrame(syncScroll));

  function addTab(path) {
    if (!tabsEl) return;
    if (tabsEl.querySelector(`[data-path="${CSS.escape(path)}"]`)) return;
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.dataset.path = path;
    tab.textContent = path.split(/[/\\]/).pop();
    const dot = document.createElement("span");
    dot.className = "status-dot";
    tab.prepend(dot);
    tabsEl.appendChild(tab);
  }

  function activateTab(path) {
    if (!tabsEl) return;
    tabsEl.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    const el = tabsEl.querySelector(`[data-path="${CSS.escape(path)}"]`);
    if (el) el.classList.add("active");
  }

  function onInput(fn) {
    if (!editor) return;
    editor.addEventListener("input", () => fn(editor.value));
  }

  function onTabClick(fn) {
    if (!tabsEl) return;
    tabsEl.addEventListener("click", e => {
      const tab = e.target.closest(".tab");
      if (!tab) return;
      fn(tab.dataset.path);
    });
  }

  // expose a method to force style sync (useful on resize or font change)
  window.addEventListener("resize", syncStyles);

  return {
    renderContent,
    addTab,
    activateTab,
    onInput,
    onTabClick,
    syncStyles,
  };
}
