const fs = require('fs');
const { spawn } = require('child_process');
const { contextBridge } = require('electron');

// TODO: Load this via fs for prod build
const settings = require('./settings.json');
const artworkFiles = [];

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

function getTableArtwork(fileName) {
  if (!settings.artworkDir || !settings.artworkDir.length) {
    return undefined;
  }

  if (!artworkFiles.length) {
    artworkFiles.push(...fs.readdirSync(settings.artworkDir));
  }

  const fileNameWithoutExt = fileName.split('.')[0];
  const matchingFile = artworkFiles.find(f => f.split('.')[0] === fileNameWithoutExt);

  return matchingFile ? `${settings.artworkDir}/${matchingFile}` : undefined;
}

contextBridge.exposeInMainWorld('settingsApi', { getAppSettings });
contextBridge.exposeInMainWorld('fileApi', { getTableFiles, getTableArtwork, playTable });
