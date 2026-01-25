use tauri::{AppHandle, Runtime};
use tauri::menu::{Menu, Submenu, MenuItemBuilder, PredefinedMenuItem};

pub fn build_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Menu<R>> {
    // ================= FILE MENU =================

    let file_new = MenuItemBuilder::with_id("file_new", "New File")
        .accelerator("Ctrl+N")
        .build(app)?;

    let file_open = MenuItemBuilder::with_id("file_open", "Open File...")
        .accelerator("Ctrl+O")
        .build(app)?;

    let file_open_folder = MenuItemBuilder::with_id("file_open_folder", "Open Folder...")
        .accelerator("Ctrl+Shift+O")
        .build(app)?;

    let file_save = MenuItemBuilder::with_id("file_save", "Save")
        .accelerator("Ctrl+S")
        .build(app)?;

    let file_save_as = MenuItemBuilder::with_id("file_save_as", "Save As...")
        .accelerator("Ctrl+Shift+S")
        .build(app)?;

    let file_exit = PredefinedMenuItem::quit(app, None)?;

    let file_menu = Submenu::new(app, "File", true)?;
    file_menu.append(&file_new)?;
    file_menu.append(&file_open)?;
    file_menu.append(&file_open_folder)?;
    file_menu.append(&PredefinedMenuItem::separator(app)?)?;
    file_menu.append(&file_save)?;
    file_menu.append(&file_save_as)?;
    file_menu.append(&PredefinedMenuItem::separator(app)?)?;
    file_menu.append(&file_exit)?;

    // ================= EDIT MENU =================

    let edit_undo = PredefinedMenuItem::undo(app, None)?;
    let edit_redo = PredefinedMenuItem::redo(app, None)?;
    let edit_cut = PredefinedMenuItem::cut(app, None)?;
    let edit_copy = PredefinedMenuItem::copy(app, None)?;
    let edit_paste = PredefinedMenuItem::paste(app, None)?;
    let edit_select_all = PredefinedMenuItem::select_all(app, None)?;

    let edit_find = MenuItemBuilder::with_id("edit_find", "Find")
        .accelerator("Ctrl+F")
        .build(app)?;

    let edit_replace = MenuItemBuilder::with_id("edit_replace", "Replace")
        .accelerator("Ctrl+H")
        .build(app)?;

    let edit_menu = Submenu::new(app, "Edit", true)?;
    edit_menu.append(&edit_undo)?;
    edit_menu.append(&edit_redo)?;
    edit_menu.append(&PredefinedMenuItem::separator(app)?)?;
    edit_menu.append(&edit_cut)?;
    edit_menu.append(&edit_copy)?;
    edit_menu.append(&edit_paste)?;
    edit_menu.append(&edit_select_all)?;
    edit_menu.append(&PredefinedMenuItem::separator(app)?)?;
    edit_menu.append(&edit_find)?;
    edit_menu.append(&edit_replace)?;

    // ================= SIMULATION MENU =================

    let sim_run = MenuItemBuilder::with_id("sim_run", "Run Simulation")
        .accelerator("F5")
        .build(app)?;

    let sim_pause = MenuItemBuilder::with_id("sim_pause", "Pause Simulation")
        .accelerator("F6")
        .build(app)?;

    let sim_stop = MenuItemBuilder::with_id("sim_stop", "Stop Simulation")
        .accelerator("Shift+F5")
        .build(app)?;

    let sim_step = MenuItemBuilder::with_id("sim_step", "Step")
        .accelerator("F10")
        .build(app)?;

    let sim_menu = Submenu::new(app, "Simulation", true)?;
    sim_menu.append(&sim_run)?;
    sim_menu.append(&sim_pause)?;
    sim_menu.append(&sim_stop)?;
    sim_menu.append(&PredefinedMenuItem::separator(app)?)?;
    sim_menu.append(&sim_step)?;

    // ================= ROOT MENU =================

    let menu = Menu::new(app)?;
    menu.append(&file_menu)?;
    menu.append(&edit_menu)?;
    menu.append(&sim_menu)?;

    Ok(menu)
}
