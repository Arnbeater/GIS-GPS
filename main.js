const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

app.setName('GIS GPS Converter');

function createWindow() {
  const win = new BrowserWindow({
    width: 980,
    height: 780,
    minWidth: 660,
    minHeight: 540,
    title: 'GIS \u2192 GPS Converter',
    autoHideMenuBar: true,
    backgroundColor: '#09090b',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  // Open all external links (Google Maps, mymaps, etc.) in the system browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
