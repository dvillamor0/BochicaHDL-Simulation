import * as Actions from "./commands.js";

const { listen } = window.__TAURI__.event;

export async function initTauriMenu() {
  console.log("[MENU] init");

  await listen("menu-event", (e) => {
    const id = e.payload;
    console.log("[MENU EVENT]", id);

    try {
      switch (id) {

        // ===== FILE =====
        case "file_new": Actions.newFile(); break;
        case "file_open": Actions.openFile(); break;
        case "file_open_folder": Actions.openDir(); break;
        case "file_save": Actions.saveFile(); break;
        case "file_save_as": Actions.saveFileAs(); break;

        // ===== EDIT =====
        case "edit_find": Actions.find(); break;
        case "edit_replace": Actions.replace(); break;

        // ===== SIMULATION =====
        case "sim_run": Actions.runSim(); break;
        case "sim_pause": Actions.pauseSim(); break;
        case "sim_stop": Actions.stopSim(); break;
        case "sim_step": Actions.stepSim(); break;

        default:
          console.warn("[MENU] Unknown menu id:", id);
      }
    } catch (err) {
      console.error("[MENU ERROR]", err);
    }
  });
}
