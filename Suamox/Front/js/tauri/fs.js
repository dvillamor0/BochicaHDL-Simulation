const { fs } = window.__TAURI__.plugins;

export const readTextFile = fs.readTextFile;
export const writeFile = fs.writeFile;
export const readDir = fs.readDir;
