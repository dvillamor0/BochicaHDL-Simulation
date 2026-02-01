import { loadUI } from "./ui-loader.js";
import { initState } from "./state.js";
import { initTauriMenu } from "../tauri/menu.js";
import { startEditorController } from "../ui/editor/editor-controller.js";

export async function boot() {
  console.log("[BOOT] Starting Suamox frontend");

  await loadUI();

  initState();
  startEditorController();
  initTauriMenu();

  console.log("[BOOT] Ready");
}
