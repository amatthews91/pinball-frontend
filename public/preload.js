const fs = require('fs');
const { spawn } = require('child_process');
const { contextBridge } = require('electron');
const settings = require('./settings.json');

function getTableFiles(path) {
  const files = fs.readdirSync(path);
  return files.filter(f => f.endsWith('.vpx'));
}

function playTable(filePath) {
  spawn(settings.executable, ['-minimized', '-play', filePath.replaceAll('/', '\\')]);
}

contextBridge.exposeInMainWorld('fileApi', { getTableFiles, playTable });
