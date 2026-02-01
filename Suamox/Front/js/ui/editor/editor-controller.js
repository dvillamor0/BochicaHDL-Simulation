import * as State from "../../core/state.js";
import { createEditorView } from "./editor-view.js";
import { analyzeSV } from "../../tauri/commands.js";

export function startEditorController() {
  console.log("[EditorController] start called — checking DOM now");

  const existing = document.getElementById("editor");
  if (existing) {
    initController();
    return;
  }

  const observer = new MutationObserver((m, o) => {
    if (document.getElementById("editor")) {
      o.disconnect();
      initController();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    if (!document.getElementById("editor")) {
      console.warn("[EditorController] editor element still missing after 2s");
    }
  }, 2000);
}

function safeParseSemantic(result) {
  // result puede ser objeto ya (si el backend devolviera JSON)
  // o puede ser una string JSON (tu caso actual)
  if (!result) return null;
  try {
    if (typeof result === "string") {
      const parsed = JSON.parse(result);
      // formas de retorno: si parsed es array of tokens -> envolver en { tokens: [...] }
      if (Array.isArray(parsed)) return { tokens: parsed };
      if (parsed.tokens) return parsed;
      return parsed;
    }
    // ya es objeto
    return result;
  } catch (e) {
    console.warn("[EditorController] parse semantic failed:", e, result);
    return null;
  }
}

function initController() {
  console.log("[EditorController] DOM ready, initializing");
  const view = createEditorView();
  const semanticByFile = Object.create(null);
  let debounceTimer = null;

  view.onInput(code => {
    console.log("[EDITOR INPUT] length=", code.length);

    // autocreate file if none
    let active = State.getActiveFile();
    if (!active) {
      State.openFile("untitled.v", "");
      active = State.getActiveFile();
    }

    State.updateContent(code);
    view.renderContent(code, semanticByFile[active.path] ?? null);

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      console.log("[SV_ANALYZE] invoking backend");
      const raw = await analyzeSV(code);
      console.log("[SV_ANALYZE] raw result:", raw);

      const semantic = safeParseSemantic(raw);
      semanticByFile[active.path] = semantic;

      const nowActive = State.getActiveFile();
      if (nowActive && nowActive.path === active.path) {
        view.renderContent(nowActive.content, semantic);
      }
    }, 220);
  });

  view.onTabClick(path => State.setActiveFile(path));

  State.on("file:opened", ({ path, content }) => {
    view.addTab(path);
    view.activateTab(path);
    view.renderContent(content, semanticByFile[path] ?? null);
  });

  State.on("file:activated", ({ path, content }) => {
    view.activateTab(path);
    view.renderContent(content, semanticByFile[path] ?? null);
  });

  State.on("file:updated", ({ path, content }) => {
    const active = State.getActiveFile();
    if (active && active.path === path) view.renderContent(content, semanticByFile[path] ?? null);
  });

  // boot file if none (idempotent)
  if (!State.getActiveFile()) {
    console.log("[EditorController] bootstrapping initial untitled file");
    State.openFile("untitled.v", "");
  }

  console.log("[EditorController] fully wired");
}
