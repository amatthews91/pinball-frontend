const fs = require('fs');
const { contextBridge } = require('electron');

function getTableFiles(path) {
  const files = fs.readdirSync(path);
  return files.filter(f => f.endsWith('.vpx'));
}

contextBridge.exposeInMainWorld('files', { getTableFiles });
