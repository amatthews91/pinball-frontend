const fs = require('fs');
const { spawn } = require('child_process');
const { contextBridge } = require('electron');

// TODO: Load this via fs for prod build
const settings = require('./settings.json');

function getAppSettings() {
  return settings;
}

function getTableFiles(path) {
  const files = fs.readdirSync(path);
  return files.filter(f => f.endsWith('.vpx'));
}

function playTable(filePath) {
  spawn(settings.executable, ['-minimized', '-play', filePath.replaceAll('/', '\\')]);
}

contextBridge.exposeInMainWorld('settingsApi', { getAppSettings });
contextBridge.exposeInMainWorld('fileApi', { getTableFiles, playTable });
