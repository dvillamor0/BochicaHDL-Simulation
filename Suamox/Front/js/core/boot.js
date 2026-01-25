import { loadUI } from "./ui-loader.js";
import { initState } from "./state.js";
import { initTauriMenu } from "../tauri/menu.js";

export async function boot() {
  console.log("[BOOT] Starting BochicaHDL-Simulationcat");

  if (!window.__TAURI__) {
    console.warn("Not running inside Tauri");
    return;
  }

  await loadUI();
  initState();
  initTauriMenu();
  console.log("[BOOT] Ready");
}
