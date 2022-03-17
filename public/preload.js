const fs = require('fs');
const { contextBridge } = require('electron');

function getTableFiles() {
  const files = fs.readdirSync('F:/Pinball/Visual Pinball/Tables');
  return files.filter(f => f.endsWith('.vpx'));
}

contextBridge.exposeInMainWorld('files', { getTableFiles });
