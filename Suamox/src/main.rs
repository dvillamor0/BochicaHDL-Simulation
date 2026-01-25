use tauri::Emitter;
mod menu;

fn main() {
    tauri::Builder::default()
        // ======= PLUGINS OBLIGATORIOS =======
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())

        .menu(|app| menu::build_menu(app))
        .on_menu_event(|app, event| {
            let id = event.id().0.clone();
            app.emit("menu-event", id).unwrap();
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
