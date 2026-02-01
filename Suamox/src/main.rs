use tauri::{Emitter, State};
mod menu;
use suamox_lib::{AppState, sv_analyze_impl};
use std::sync::Mutex;
use cochavira_core::api::CochaviraEngine;

fn main() {
    let engine = CochaviraEngine::new_gpu().expect("GPU backend failed");

    tauri::Builder::default()

        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())

        .manage(AppState {
            engine: Mutex::new(engine),
        })
        .invoke_handler(tauri::generate_handler![
        sv_analyze
        ])
        .menu(|app| menu::build_menu(app))
        .on_menu_event(|app, event| {
            let id = event.id().0.clone();
            app.emit("menu-event", id).unwrap();
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn sv_analyze(
    source: String,
    state: State<AppState>,
) -> Result<String, String> {
    sv_analyze_impl(source, state)
}
